import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { recipientType, emailType, tone, userInput } = await request.json();

    if (!recipientType || !emailType || !tone || !userInput) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert email writing assistant.

Write a polished email using the following details:

Recipient Type: ${recipientType}
Email Type: ${emailType}
Tone: ${tone}
User Input: ${userInput}

Return the response in this exact format:

Subject: <subject line>

<body of email>
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      email: response.text,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    );
  }
}