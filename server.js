import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mammoth from 'mammoth';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import {
  chatWithAI,
  generateAIContent,
  summarizeDocumentText,
} from './services/openaiService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.use(cors());
app.use(express.json());

function getExtension(filename = '') {
  return filename.split('.').pop()?.toLowerCase() || '';
}

async function extractTextFromFile(file) {
  const extension = getExtension(file.originalname);

  if (extension === 'txt') {
    return file.buffer.toString('utf-8').trim();
  }

  if (extension === 'pdf') {
    const parsed = await pdfParse(file.buffer);
    return parsed.text.trim();
  }

  if (extension === 'docx') {
    const parsed = await mammoth.extractRawText({ buffer: file.buffer });
    return parsed.value.trim();
  }

  throw new Error('Unsupported file type. Please upload a .txt, .pdf, or .docx file.');
}

app.get('/', (_req, res) => {
  res.send('LexNode API is running');
});

app.post('/generate-document', async (req, res) => {
  const directPrompt = req.body.prompt?.trim();
  const partyA = req.body.partyA || req.body.partyAName;
  const partyB = req.body.partyB || req.body.partyBName;
  const duration = req.body.duration;
  const jurisdiction = req.body.jurisdiction || 'India';
  const extra = req.body.extra || req.body.additionalClauses || '';

  if (!directPrompt && (!partyA || !partyB || !duration)) {
    return res.status(400).json({
      message: 'Provide either a prompt or partyA, partyB, and duration.',
    });
  }

  const prompt =
    directPrompt ||
    `Generate a professional Non-Disclosure Agreement (NDA) for LexNode using:
Party A: ${partyA}
Party B: ${partyB}
Duration: ${duration}
Jurisdiction: ${jurisdiction}
Additional Terms: ${extra}

Make it formal, legally structured, and easy to understand.`;

  try {
    const document = await generateAIContent(prompt);
    return res.json({ document });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to generate document.',
    });
  }
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      message: 'message is required.',
    });
  }

  const prompt = `You are LexNode AI, a legal assistant for beginners. Explain legal concepts in simple language. Do not provide official legal advice.

User: ${message}`;

  try {
    const reply = await chatWithAI(prompt);
    return res.json({ reply });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to get chat response.',
    });
  }
});

app.post('/summarize', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'A document file is required.',
      });
    }

    const extension = getExtension(req.file.originalname);

    if (!['txt', 'pdf', 'docx'].includes(extension)) {
      return res.status(400).json({
        message: 'Invalid file type. Please upload a .txt, .pdf, or .docx file.',
      });
    }

    const extractedText = await extractTextFromFile(req.file);

    if (!extractedText) {
      return res.status(400).json({
        message: 'Could not extract readable text from the uploaded document.',
      });
    }

    const summary = await summarizeDocumentText(extractedText);

    return res.json({
      extractedText: extractedText.slice(0, 4000),
      summary,
    });
  } catch (error) {
    const isClientError =
      error.message?.includes('Unsupported file type') ||
      error.message?.includes('Could not extract') ||
      error.message?.includes('Invalid file type');

    if (isClientError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: error.message || 'Failed to summarize document.',
    });
  }
});

app.use((error, _req, res, next) => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      message: 'File size must be 5MB or less.',
    });
  }

  return next(error);
});

app.listen(port, () => {
  console.log(`LexNode API running on port ${port}`);
});
