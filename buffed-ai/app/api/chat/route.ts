import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge'; // Use edge runtime for Netlify Edge Functions

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages
  });

  // Use the response body as a ReadableStream via toReadableStream()
  return new Response(completion.toReadableStream(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}