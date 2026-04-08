import axios from 'axios';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

export async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY in environment variables.');
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text || '')
        .join('\n')
        .trim() || '';

    if (!text) {
      throw new Error('Gemini returned an empty response.');
    }

    return text;
  } catch (error) {
    const message =
      error.response?.data?.error?.message ||
      error.message ||
      'Failed to communicate with Gemini.';

    throw new Error(message);
  }
}
