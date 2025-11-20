'use client';

import { MovieCard, MovieCardSkeleton } from '@/components/movie-card';
import { Streamdown } from 'streamdown';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import type { Movie, MessagePart } from '@/types/movie';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  parts: MessagePart[];
}

/**
 * Check if all movie recommendations are loaded
 */
function areMoviesLoaded(parts: MessagePart[]): boolean {
  const movieParts = parts.filter(part => part.type === 'tool-recommendMovie');
  const textParts = parts.filter(part => part.type === 'text');

  const hasMovies = movieParts.length > 0;
  const allMoviesLoaded = movieParts.every(
    part => part.state === 'output-available' && part.output
  );
  const allTextLoaded = textParts.every(
    part => part.text !== undefined && part.text.length > 0
  );

  return hasMovies && allMoviesLoaded && allTextLoaded;
}

/**
 * Render a user message
 */
function UserMessage({ parts }: { parts: MessagePart[] }) {
  const userText = parts
    .map(part => (part.type === 'text' ? part.text : null))
    .filter(Boolean)
    .join('');

  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="max-w-[80%] rounded-lg px-4 py-2 bg-primary text-primary-foreground">
        <div className="text-sm font-medium mb-1 opacity-70">You</div>
        <div className="text-sm prose prose-sm prose-invert max-w-none">
          <Streamdown>{userText}</Streamdown>
        </div>
      </div>
    </div>
  );
}

/**
 * Render a movie card based on its state
 */
function MovieRecommendation({ part }: { part: MessagePart }) {
  // Loading state
  if (part.state === 'input-streaming' || part.state === 'input-available') {
    return <MovieCardSkeleton />;
  }

  // Error state
  if (part.state === 'output-error') {
    return (
      <div className="max-w-md rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="text-destructive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-destructive">
              Failed to load movie recommendation
            </p>
            {part.errorText && (
              <p className="text-xs text-destructive/80 mt-1">
                {part.errorText}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (part.state === 'output-available' && part.output) {
    const movie = part.output as Movie;
    return (
      <MovieCard
        title={movie.title}
        year={movie.year}
        rating={movie.rating}
        plot={movie.plot}
        posterUrl={movie.posterUrl}
        imdbId={movie.imdbId}
        genre={movie.genre}
      />
    );
  }

  return null;
}

/**
 * Render assistant message with movie recommendations
 */
function AssistantMessage({ parts }: { parts: MessagePart[] }) {
  const confettiShown = useRef(false);

  // Trigger confetti when all recommendations are loaded
  useEffect(() => {
    if (areMoviesLoaded(parts) && !confettiShown.current) {
      confettiShown.current = true;
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 300);
    }
  }, [parts]);

  // Separate movie cards from text
  const movieParts = parts.filter(part => part.type === 'tool-recommendMovie');
  const textParts = parts.filter(part => part.type === 'text');

  return (
    <div className="flex flex-col gap-3 items-start">
      <div className="max-w-full w-full space-y-3">
        <div className="text-sm font-medium opacity-70 text-muted-foreground">
          AI Assistant
        </div>

        {/* Movie cards grid */}
        {movieParts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full auto-rows-fr">
            {movieParts.map((part, i) => (
              <div key={i} className="h-full">
                <MovieRecommendation part={part} />
              </div>
            ))}
          </div>
        )}

        {/* Text commentary */}
        {textParts.map((part, i) =>
          part.type === 'text' ? (
            <div
              key={i}
              className="max-w-[80%] rounded-lg px-4 py-2 bg-muted text-foreground border border-border"
            >
              <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                <Streamdown>{part.text || ''}</Streamdown>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

/**
 * Main chat message component
 */
export function ChatMessage({ role, parts }: ChatMessageProps) {
  if (role === 'user') {
    return <UserMessage parts={parts} />;
  }

  return <AssistantMessage parts={parts} />;
}
