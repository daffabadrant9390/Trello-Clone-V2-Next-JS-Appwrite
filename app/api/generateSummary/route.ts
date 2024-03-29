import { NextResponse } from 'next/server';
import openai from '@/openai';

export async function POST(request: Request) {
  const { todos } = await request.json();

  // Communicate with openAI GPT
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'When responding, welcome the user always as Mr Daffa and say welcome to the AMAZING Todo App! Limit the response to 200 characters',
      },
      {
        role: 'user',
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
    stream: false,
    temperature: 0.8,
    n: 1,
  });

  const { choices } = response || {};

  return NextResponse.json(choices[0].message);
}
