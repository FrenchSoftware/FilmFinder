# FilmFinder

Stop scrolling through Netflix. Ask an AI and get actual movie cards with posters, ratings, and IMDb links. Built with Vercel AI SDK.

[![Discord](https://img.shields.io/discord/YOUR_DISCORD_ID?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://discord.gg/HXkpCG7DEH)

## Why this exists

Because getting movie recommendations shouldn't mean reading paragraphs of text. You ask for a movie, you get a card with everything you need: poster, rating, genres, and a link to IMDb. Click the poster to see it full-screen. That's it.

## Quick Start

```bash
git clone <this-repo>
cd filmfinder
npm install
```

Create `.env.local`:

```bash
OPENROUTER_API_KEY=sk_or_v1_xxxxx  # Free at openrouter.ai
OMDB_API_KEY=xxxxx                 # Optional - for real posters
```

Run it:

```bash
npm run dev
```

Open `localhost:3000` and start asking for movies.

## API Keys

**OpenRouter** (required) - [Get yours here](https://openrouter.ai/settings/keys). Free tier included.

**OMDB** (optional) - [Request here](https://www.omdbapi.com/apikey.aspx). Without this, you get AI-generated poster URLs. With it, you get real movie data from IMDb.

## How it works

Uses Vercel AI SDK's tool calling. When you ask for a movie, the LLM calls `recommendMovie` with structured data (title, year, rating, poster URL). The frontend renders a `<MovieCard>` component instead of text.

```typescript
// app/api/chat/route.ts
tools: {
  recommendMovie: tool({
    parameters: z.object({
      title: z.string(),
      year: z.number(),
      rating: z.number(),
      posterUrl: z.string().url(),
      // ...
    }),
    execute: async (params) => params,
  }),
}
```

The rest is just UI polish.

## Built with

- Next.js 16 (App Router + Turbopack)
- Vercel AI SDK 5.0
- OpenRouter (free LLM access)
- shadcn/ui + Tailwind
- TypeScript

## Customizing

**Change the AI model** - Edit `app/api/chat/route.ts` line 16. Free options:

- `mistralai/mistral-small-3.2-24b-instruct:free` (default)
- `deepseek/deepseek-r1-0528:free`
- `qwen/qwen3-coder:free`

[Browse all free models](https://openrouter.ai/models?q=free)

**Edit starter prompts** - `components/chat/suggestions-grid.tsx`:

```typescript
const mainSuggestions = [
  {
    emoji: "🎬",
    title: "Your prompt",
    description: "What it does",
    prompt: "Actual message sent to AI",
  },
];
```

## Deployment

Push to GitHub, import on [Vercel](https://vercel.com/new), add your API keys, deploy. Done.

For other platforms: [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)

## Troubleshooting

- **Port 3000 in use**: Next.js auto-switches to 3001
- **API keys not working**: Check `.env.local` is in project root, restart dev server
- **Build fails**: `rm -rf .next && npm run build`

## Community

[Discord](https://discord.gg/HXkpCG7DEH) - Ask questions, share what you built, hang out.

## Contributing

PRs welcome. Bug fixes: just send it. Features: open an issue first.

## License

MIT
