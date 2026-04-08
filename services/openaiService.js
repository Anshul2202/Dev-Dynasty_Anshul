import OpenAI from 'openai';

const baseURL = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
const defaultModel = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

function getClient() {
  const apiKey = process.env.GROQ_API_KEY || process.env.GSK_API_KEY;

  if (!apiKey) {
    throw new Error('Missing GROQ_API_KEY in environment variables.');
  }

  return new OpenAI({
    apiKey,
    baseURL,
  });
}

async function createTextResponse(input) {
  try {
    const client = getClient();
    const response = await client.chat.completions.create({
      model: defaultModel,
      messages: [{ role: 'user', content: input }],
    });

    const text = response.choices?.[0]?.message?.content?.trim();

    if (!text) {
      throw new Error('The AI provider returned an empty response.');
    }

    return text;
  } catch (error) {
    throw new Error(error?.message || 'Failed to communicate with the AI provider.');
  }
}

export async function generateAIContent(prompt) {
  return createTextResponse(prompt);
}

export async function chatWithAI(prompt) {
  return createTextResponse(prompt);
}

export async function summarizeDocumentText(documentText) {
  const prompt = `Summarize the following legal document in simple language. Highlight key points, obligations, and risks:

${documentText.slice(0, 15000)}

Keep it concise and easy to understand.`;

  return createTextResponse(prompt);
}
