/**
 * Movie-related type definitions
 */

export interface Movie {
  title: string;
  year: number;
  rating: number;
  plot: string;
  posterUrl: string;
  imdbId: string;
  genre: string[];
}

export interface MessagePart {
  type: string;
  text?: string;
  state?: string;
  output?: unknown;
  errorText?: string;
}
