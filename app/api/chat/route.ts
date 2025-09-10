import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("[v0] OPENAI_API_KEY environment variable is not set")
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
    }

    console.log("[v0] Attempting to generate response for message:", message.substring(0, 50) + "...")

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system:
        "You are a helpful digital worker assistant for an industrial knowledge hub. Provide concise, professional answers about manufacturing, maintenance, safety, and equipment operations.",
      prompt: message,
      maxTokens: 500,
      temperature: 0.7,
    })

    console.log("[v0] Successfully generated response")
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("[v0] Chat API error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    })

    if (error instanceof Error) {
      if (error.message.includes("quota") || error.message.includes("billing")) {
        return NextResponse.json(
          {
            error:
              "OpenAI API quota exceeded. Please check your billing details at platform.openai.com or try again later.",
            fallbackResponse:
              "I'm currently unable to process your request due to API limitations. For immediate assistance with manufacturing, maintenance, or safety questions, please consult your local documentation or contact your supervisor.",
          },
          { status: 429 },
        )
      }
      if (error.message.includes("API key")) {
        return NextResponse.json({ error: "Invalid API key configuration" }, { status: 401 })
      }
      if (error.message.includes("rate limit")) {
        return NextResponse.json({ error: "Rate limit exceeded, please try again later" }, { status: 429 })
      }
    }

    return NextResponse.json(
      {
        error: "Failed to process your request. Please check the console for details.",
      },
      { status: 500 },
    )
  }
}
