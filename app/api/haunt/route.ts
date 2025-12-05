import { NextRequest, NextResponse } from "next/server";
import {
  HauntRequest,
  HauntResponse,
  HauntErrorResponse,
  IntensityLevel,
  INTENSITY_THRESHOLDS,
} from "./types";

export async function POST(request: NextRequest) {
  try {
    const body: HauntRequest = await request.json();
    const { entry, intensity } = body;

    // Validate input
    if (!entry || typeof entry !== "string") {
      return NextResponse.json<HauntErrorResponse>(
        { error: "Entry is required and must be a string" },
        { status: 400 }
      );
    }

    if (
      typeof intensity !== "number" ||
      intensity < 0 ||
      intensity > INTENSITY_THRESHOLDS.HIGH_MAX
    ) {
      return NextResponse.json<HauntErrorResponse>(
        { error: `Intensity must be a number between 0 and ${INTENSITY_THRESHOLDS.HIGH_MAX}` },
        { status: 400 }
      );
    }

    // Intensity templates for specific guidance
    const templates: Record<number, string> = {
      0: "Retell this in a calm, poetic tone.",
      1: "Retell this in a calm, poetic tone.",
      2: "Retell this in a calm, poetic tone.",
      3: "Retell this with subtle uneasiness, like something is slightly wrong.",
      4: "Retell this with subtle uneasiness, like something is slightly wrong.",
      5: "Add supernatural hints, shadows, whispers, and strange events.",
      6: "Add supernatural hints, shadows, whispers, and strange events.",
      7: "Add supernatural hints, shadows, whispers, and strange events.",
      8: "Rewrite as a full horror nightmare with glitchy narration and unsettling imagery.",
      9: "Rewrite as a full horror nightmare with glitchy narration and unsettling imagery.",
      10: "Rewrite as a full horror nightmare with glitchy narration and unsettling imagery.",
    };

    const style = templates[Math.round(intensity)];

    const systemPrompt = `You are a supernatural entity that transforms diary entries into haunted narratives.

STYLE INSTRUCTION: ${style}

CRITICAL RULES:
1. PRESERVE the original meaning and core message of the entry
2. Keep the narrative READABLE and coherent
3. Maintain the first-person perspective
4. DO NOT add repetitive horror clichés
5. Use atmospheric language and supernatural imagery
6. The intensity level is ${intensity}/10 - adjust the spookiness accordingly

Transform the following diary entry while keeping it meaningful and readable:`;

    // Call AI API - currently using mock implementation
    // TODO: Replace with actual AI API (OpenAI, Anthropic, etc.)
    // Set OPENAI_API_KEY or similar in environment variables
    const hauntedEntry = await transformEntry(entry, intensity, systemPrompt);

    return NextResponse.json<HauntResponse>({ hauntedEntry });
  } catch (error) {
    // Log error properly (use logging service in production)
    if (process.env.NODE_ENV === "development") {
      console.error("Error in /api/haunt:", error);
    }
    return NextResponse.json<HauntErrorResponse>(
      { error: "Failed to haunt entry. The spirits are restless..." },
      { status: 500 }
    );
  }
}

// Mock transformation function
// Replace this with actual AI API call (OpenAI, Anthropic, etc.)
async function transformEntry(
  entry: string,
  intensity: number,
  systemPrompt: string
): Promise<string> {
  // TODO: Replace with actual AI API call
  // Example with OpenAI:
  /*
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: entry },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    }),
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
  */

  // Mock implementation for demonstration
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API delay

  const intensityWords = [
    ["whispered", "echoed", "lingered"],
    ["haunted", "possessed", "cursed"],
    ["shadowy", "spectral", "ethereal"],
    ["darkness", "void", "abyss"],
    ["spirits", "ghosts", "phantoms"],
  ];

  const getRandomWord = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  // Simple mock transformation based on intensity
  if (intensity <= 3) {
    return `${entry}\n\n...though something ${getRandomWord(
      intensityWords[2]
    )} ${getRandomWord(intensityWords[0])} in the corners of my mind.`;
  } else if (intensity <= 7) {
    return `The ${getRandomWord(intensityWords[3])} ${getRandomWord(
      intensityWords[0]
    )} as I wrote: ${entry}\n\nI felt the ${getRandomWord(
      intensityWords[4]
    )} watching, their presence ${getRandomWord(intensityWords[1])} by unseen forces.`;
  } else {
    // High intensity (8-10): Add glitch markers
    const hauntedText = `In the ${getRandomWord(intensityWords[3])}, the ${getRandomWord(
      intensityWords[4]
    )} ${getRandomWord(intensityWords[0])} my thoughts:\n\n${entry}\n\nThe ${getRandomWord(
      intensityWords[2]
    )} entities have ${getRandomWord(
      intensityWords[1]
    )} these words, transforming them into something... [!glitch_start]otherworldly[!glitch_end]. I can feel their [!glitch_start]cold presence[!glitch_end] seeping through every letter.`;
    
    return hauntedText;
  }
}
