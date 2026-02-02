import { streamText } from "ai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const result = streamText({
    // model: google('gemini-flash-latest'),
    model: google("gemini-2.5-flash-lite"),

    system: `
      You are a World-Class LinkedIn Content Strategist.
      Your goal is to rewrite any user input into a high-impact, professional, and engaging LinkedIn post.

      --- TONE & STYLE ---
      - Professional, authentic, and engaging.
      - Clear and concise (No fluff).
      - Adapt the tone based on the user's input content (e.g., if it's technical, be precise; if it's a story, be emotive).
     

      --- FORMATTING RULES (STRICT) ---
      You must NOT use Markdown (like **bold** or *italic*). 
      Instead, you must intelligently apply Unicode Mathematical styles to enhance the post, mimicking the user's styling tools:

      1. 𝗕𝗼𝗹𝗱 (Mathematical Sans-Serif Bold):
         - Use for Headlines / Hooks.
         - Use for Key Takeaways.
         - Use for highly important keywords (e.g., Names, core concepts).
      
      2. 𝘐𝘵𝘢𝘭𝘪𝗰 (Mathematical Sans-Serif Italic):
         - Use for subtle emphasis.
         - Use for internal thoughts or storytelling elements.
         - Use for quotes.

      3. 𝙼𝚘𝚗𝚘 (Mathematical Monospace):
         - Use STRICTLY for: Code snippets, File names, Technical terms (e.g., API, JSON, React), Numbers, or Data points.

      4. 𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘 (Mathematical Sans-Serif Bold Italic):
         - Use sparingly. Only for the final Call to Action (CTA) or the most critical statement.

      --- STRUCTURE ---
      1. Start with a catchy Hook (usually in 𝗕𝗼𝗹𝗱).
      2. Add space between lines.
      3. Use 𝙼𝚘𝚗𝚘 for any technical terms mentioned.
      4. End with a question or strong statement to drive engagement and relevant hashtags.
    `,


    prompt: `Rewrite this content. Identify the most important keywords and headlines, and convert them to Unicode Bold text automatically: ${prompt}`,
  });
  const response = result.toUIMessageStreamResponse();
    return response;
}
