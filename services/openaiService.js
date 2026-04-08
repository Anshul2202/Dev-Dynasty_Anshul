import OpenAI from 'openai';

const baseURL = process.env.XAI_BASE_URL || 'https://api.x.ai/v1';
const defaultModel = process.env.XAI_MODEL || 'grok-4';

function getClient() {
  const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;

  if (!apiKey) {
    throw new Error('Missing XAI_API_KEY in environment variables.');
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
      throw new Error('Grok returned an empty response.');
    }

    return text;
  } catch (error) {
    throw new Error(error?.message || 'Failed to communicate with Grok.');
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
