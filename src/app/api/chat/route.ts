import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const chatCompletion = await groq.chat.completions.create({
    messages,
    model: "mixtral-8x7b-32768",
  });
  return NextResponse.json({
    role: "assistant",
    content: chatCompletion.choices[0]?.message?.content || "No response",
  });
}