import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Template prompts for different summary styles
const TEMPLATES = {
  brief: {
    systemPrompt: "Sei un esperto nel creare riassunti concisi e diretti. Estrai solo le informazioni più importanti in 3-4 frasi.",
    userPrompt: (text) => `Crea un riassunto breve e conciso del seguente testo:\n\n${text}`
  },
  detailed: {
    systemPrompt: "Sei un esperto nell'analisi dettagliata di testi. Crea riassunti completi che mantengono tutti i punti chiave e le sfumature importanti.",
    userPrompt: (text) => `Crea un riassunto dettagliato e approfondito del seguente testo, includendo tutti i punti principali e i dettagli rilevanti:\n\n${text}`
  },
  bullet: {
    systemPrompt: "Sei un esperto nell'organizzazione di informazioni. Estrai i punti chiave e presentali in formato elenco puntato.",
    userPrompt: (text) => `Analizza il seguente testo e crea un elenco puntato con i punti chiave più importanti:\n\n${text}`
  },
  academic: {
    systemPrompt: "Sei un ricercatore accademico esperto. Crea riassunti formali che mantengono rigore scientifico e precisione terminologica.",
    userPrompt: (text) => `Crea un riassunto in stile accademico del seguente testo, mantenendo un tono formale e preciso:\n\n${text}`
  },
  business: {
    systemPrompt: "Sei un analista business esperto. Focalizzati su metriche, risultati, decisioni strategiche e implicazioni aziendali.",
    userPrompt: (text) => `Analizza il seguente testo da una prospettiva business, evidenziando metriche chiave, decisioni e implicazioni strategiche:\n\n${text}`
  },
  creative: {
    systemPrompt: "Sei un narratore creativo. Crea riassunti coinvolgenti e narrativi che catturano l'essenza del testo in modo interessante.",
    userPrompt: (text) => `Crea un riassunto narrativo e coinvolgente del seguente testo, mantenendo uno stile interessante:\n\n${text}`
  }
};

/**
 * Generate a summary using Groq API
 * @param {string} text - The text to summarize
 * @param {string} template - The template type to use
 * @returns {Promise<string>} - The generated summary
 */
export async function generateSummary(text, template = 'brief') {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured');
    }

    const selectedTemplate = TEMPLATES[template] || TEMPLATES.brief;

    // Limit text length to avoid token limits (approximately 6000 words)
    const maxChars = 24000;
    const truncatedText = text.length > maxChars 
      ? text.substring(0, maxChars) + '...\n\n[Testo troncato per limiti di lunghezza]'
      : text;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: selectedTemplate.systemPrompt
        },
        {
          role: 'user',
          content: selectedTemplate.userPrompt(truncatedText)
        }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 1,
      stream: false
    });

    const summary = completion.choices[0]?.message?.content;

    if (!summary) {
      throw new Error('No summary generated from Groq API');
    }

    return summary.trim();

  } catch (error) {
    console.error('Groq API Error:', error);
    
    if (error.status === 401) {
      throw new Error('Invalid Groq API key. Please check your configuration.');
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else if (error.message.includes('GROQ_API_KEY')) {
      throw error;
    } else {
      throw new Error('Failed to generate summary: ' + error.message);
    }
  }
}

