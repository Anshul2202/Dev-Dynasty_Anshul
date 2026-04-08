import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { callGemini } from './services/geminiService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('LexNode API is running');
});

app.post('/generate-document', async (req, res) => {
  const partyA = req.body.partyA || req.body.partyAName;
  const partyB = req.body.partyB || req.body.partyBName;
  const duration = req.body.duration;
  const jurisdiction = req.body.jurisdiction || 'India';
  const extra = req.body.extra || req.body.additionalClauses || '';

  if (!partyA || !partyB || !duration) {
    return res.status(400).json({
      message: 'partyA, partyB, and duration are required.',
    });
  }

  const prompt = `Generate a professional Non-Disclosure Agreement (NDA) for LexNode using:
Party A: ${partyA}
Party B: ${partyB}
Duration: ${duration}
Jurisdiction: ${jurisdiction}
Additional Terms: ${extra}

Make it formal, legally structured, and easy to understand.`;

  try {
    const document = await callGemini(prompt);
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
    const reply = await callGemini(prompt);
    return res.json({ reply });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Failed to get chat response.',
    });
  }
});

app.listen(port, () => {
  console.log(`LexNode API running on port ${port}`);
});
