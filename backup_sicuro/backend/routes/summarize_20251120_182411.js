import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { extractTextFromFile } from '../utils/fileProcessor.js';
import { generateSummary } from '../services/groqService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported. Only PDF, DOC, DOCX, and TXT files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Summarize text endpoint
router.post('/summarize', async (req, res) => {
  try {
    const { text, template } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Text content is required'
      });
    }

    if (!template) {
      return res.status(400).json({
        success: false,
        error: 'Template type is required'
      });
    }

    // Generate summary using Groq
    const result = await generateSummary(text, template);

    res.json({
      success: true,
      data: {
        summary: result.summary,
        template: template,
        originalLength: text.length,
        summaryLength: result.summary.length,
        truncated: result.truncated,
        truncatedLength: result.truncatedLength,
        timestamp: new Date().toISOString()
      },
      warning: result.truncated 
        ? `⚠️ Il testo originale (${result.originalLength} caratteri) è stato troncato a ${result.truncatedLength} caratteri per rispettare i limiti del modello.`
        : null
    });

  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate summary'
    });
  }
});

// Summarize file endpoint
router.post('/summarize-file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const { template } = req.body;

    if (!template) {
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        error: 'Template type is required'
      });
    }

    // Extract text from file
    const extractedText = await extractTextFromFile(req.file);

    if (!extractedText || extractedText.trim().length === 0) {
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        error: 'Could not extract text from file'
      });
    }

    // Generate summary using Groq
    const summary = await generateSummary(extractedText, template);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      data: {
        summary: summary,
        template: template,
        filename: req.file.originalname,
        originalLength: extractedText.length,
        summaryLength: summary.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Summarize file error:', error);
    
    // Clean up uploaded file if exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process file'
    });
  }
});

// Get available templates
router.get('/templates', (req, res) => {
  const templates = [
    {
      id: 'brief',
      name: 'Breve',
      description: 'Riassunto conciso e diretto',
      icon: '⚡'
    },
    {
      id: 'detailed',
      name: 'Dettagliato',
      description: 'Analisi approfondita e completa',
      icon: '📋'
    },
    {
      id: 'bullet',
      name: 'Punti Chiave',
      description: 'Elenco puntato degli elementi principali',
      icon: '📝'
    },
    {
      id: 'academic',
      name: 'Accademico',
      description: 'Stile formale per ricerca e studio',
      icon: '🎓'
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Focus su metriche e decisioni aziendali',
      icon: '💼'
    },
    {
      id: 'creative',
      name: 'Creativo',
      description: 'Riassunto narrativo e coinvolgente',
      icon: '✨'
    }
  ];

  res.json({
    success: true,
    data: templates
  });
});

// Error handling for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: 'File upload error: ' + err.message
    });
  }
  next(err);
});

export default router;

