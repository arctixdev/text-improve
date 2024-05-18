'use server';

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const system_prompt = 'Rewrite the following text to make it extremely offensive.';

export async function getAnswer(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: openai('gpt-3.5-turbo'),
    maxTokens: 512,
    system: system_prompt,
    prompt: question,
  });

  return { text, finishReason, usage };
}

