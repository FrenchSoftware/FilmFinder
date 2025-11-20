import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, Tool } from "ai";
import { z } from "zod";
import { getOMDBClient } from "@/lib/omdb";

export const runtime = "edge";

// Schema for movie recommendation tool input
const recommendMovieSchema = z.object({
  title: z
    .string()
    .describe(
      "The movie title in English (e.g., 'Breathless' not 'À bout de souffle')"
    ),
  year: z
    .number()
    .optional()
    .describe("Release year (optional but improves accuracy)"),
});

// Schema for tool output
const movieOutputSchema = z.object({
  title: z.string(),
  year: z.number(),
  rating: z.number(),
  plot: z.string(),
  posterUrl: z.string(),
  imdbId: z.string(),
  genre: z.array(z.string()),
});

// System prompt for the AI
const SYSTEM_PROMPT = `You're a movie recommendation assistant. Call the recommendMovie tool for each movie you want to recommend.

CRITICAL RULES:
1. ALWAYS use ENGLISH titles for movies - never use foreign language titles
   - Example: Use "Breathless" NOT "À bout de souffle"
   - Example: Use "Children of Paradise" NOT "Les Enfants du Paradis"
2. Include the year if you know it for better accuracy
3. Recommend 3-5 movies unless asked for a specific number
4. After calling the tools, do NOT write any text - just stop
5. The OMDB database requires English titles to find movies`;

/**
 * Tool for recommending movies with real data from OMDB
 */
const recommendMovieTool: Tool = {
  description:
    "Display a movie recommendation with poster and details from OMDB database. Always use English titles.",
  inputSchema: recommendMovieSchema,
  outputSchema: movieOutputSchema,
  execute: async (input: z.infer<typeof recommendMovieSchema>) => {
    try {
      const omdb = getOMDBClient();
      return await omdb.findMovie(input.title, input.year);
    } catch (error) {
      console.error("[RecommendMovie] Error:", error);
      throw error;
    }
  },
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
    tools: {
      recommendMovie: recommendMovieTool,
    },
  });

  return result.toUIMessageStreamResponse();
}
