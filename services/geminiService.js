import { generateAIContent } from './openaiService.js';

export async function callGemini(prompt) {
  return generateAIContent(prompt);
}
