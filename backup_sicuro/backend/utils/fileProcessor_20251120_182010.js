import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * Extract text from uploaded file based on file type
 * @param {Object} file - Multer file object
 * @returns {Promise<string>} - Extracted text content
 */
export async function extractTextFromFile(file) {
  try {
    const filePath = file.path;
    const mimeType = file.mimetype;

    switch (mimeType) {
      case 'application/pdf':
        return await extractFromPDF(filePath);
      
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return await extractFromDOC(filePath);
      
      case 'text/plain':
        return await extractFromTXT(filePath);
      
      default:
        throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('File processing error:', error);
    throw new Error('Failed to extract text from file: ' + error.message);
  }
}

/**
 * Extract text from PDF file
 */
async function extractFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('No text content found in PDF');
    }
    
    return data.text.trim();
  } catch (error) {
    throw new Error('Failed to parse PDF: ' + error.message);
  }
}

/**
 * Extract text from DOC/DOCX file
 */
async function extractFromDOC(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    
    if (!result.value || result.value.trim().length === 0) {
      throw new Error('No text content found in document');
    }
    
    return result.value.trim();
  } catch (error) {
    throw new Error('Failed to parse document: ' + error.message);
  }
}

/**
 * Extract text from TXT file
 */
async function extractFromTXT(filePath) {
  try {
    const text = fs.readFileSync(filePath, 'utf8');
    
    if (!text || text.trim().length === 0) {
      throw new Error('Text file is empty');
    }
    
    return text.trim();
  } catch (error) {
    throw new Error('Failed to read text file: ' + error.message);
  }
}

