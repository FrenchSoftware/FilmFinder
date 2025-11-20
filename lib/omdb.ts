/**
 * OMDB API client for fetching movie data
 */

import type { Movie } from "@/types/movie";

interface OMDBMovie {
  Title: string;
  Year: string;
  imdbRating: string;
  Plot: string;
  Poster: string;
  imdbID: string;
  Genre: string;
  Response: string;
  Error?: string;
}

interface OMDBSearchResult {
  Search?: Array<{
    Title: string;
    Year: string;
    imdbID: string;
  }>;
  Response: string;
  Error?: string;
}

const FALLBACK_POSTER = "https://via.placeholder.com/300x450?text=No+Poster";
const DEFAULT_RATING = 7.0;

class OMDBClient {
  private apiKey: string;
  private baseUrl = "https://www.omdbapi.com/";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Search for a movie by exact title
   */
  private async searchByTitle(title: string, year?: number): Promise<OMDBMovie | null> {
    const params = new URLSearchParams({
      apikey: this.apiKey,
      t: title,
      type: "movie",
    });

    if (year) {
      params.append("y", year.toString());
    }

    console.log(`[OMDB] Searching for: ${title}${year ? ` (${year})` : ""}`);

    const response = await fetch(`${this.baseUrl}?${params.toString()}`);
    const data: OMDBMovie = await response.json();

    if (data.Response === "True") {
      console.log(`[OMDB] Found: ${data.Title} (${data.Year}) - ${data.imdbID}`);
      return data;
    }

    console.log(`[OMDB] Not found: ${data.Error}`);
    return null;
  }

  /**
   * Fallback: General search to find the first matching result
   */
  private async searchGeneral(title: string, year?: number): Promise<OMDBMovie | null> {
    const params = new URLSearchParams({
      apikey: this.apiKey,
      s: title,
      type: "movie",
    });

    if (year) {
      params.append("y", year.toString());
    }

    console.log(`[OMDB] Fallback search for: ${title}`);

    const response = await fetch(`${this.baseUrl}?${params.toString()}`);
    const data: OMDBSearchResult = await response.json();

    if (data.Response === "True" && data.Search && data.Search.length > 0) {
      const firstResult = data.Search[0];
      console.log(`[OMDB] Found via search: ${firstResult.Title} (${firstResult.Year})`);

      // Fetch full details
      return await this.getMovieById(firstResult.imdbID);
    }

    return null;
  }

  /**
   * Get movie details by IMDb ID
   */
  private async getMovieById(imdbId: string): Promise<OMDBMovie | null> {
    const params = new URLSearchParams({
      apikey: this.apiKey,
      i: imdbId,
    });

    const response = await fetch(`${this.baseUrl}?${params.toString()}`);
    const data: OMDBMovie = await response.json();

    return data.Response === "True" ? data : null;
  }

  /**
   * Transform OMDB data to our app format
   */
  private transformMovie(data: OMDBMovie): Movie {
    return {
      title: data.Title,
      year: parseInt(data.Year, 10),
      rating: data.imdbRating !== "N/A" ? parseFloat(data.imdbRating) : DEFAULT_RATING,
      plot: data.Plot !== "N/A" ? data.Plot : "No plot available.",
      posterUrl: data.Poster !== "N/A" ? data.Poster : FALLBACK_POSTER,
      imdbId: data.imdbID,
      genre: data.Genre !== "N/A" ? data.Genre.split(", ") : ["Unknown"],
    };
  }

  /**
   * Find a movie by title, trying exact match first, then fallback search
   */
  async findMovie(title: string, year?: number): Promise<Movie> {
    // Try exact title match first
    let movieData = await this.searchByTitle(title, year);

    // If not found, try general search
    if (!movieData) {
      movieData = await this.searchGeneral(title, year);
    }

    if (!movieData) {
      throw new Error(`Could not find movie: ${title}`);
    }

    return this.transformMovie(movieData);
  }
}

/**
 * Get OMDB client instance
 */
export function getOMDBClient(): OMDBClient {
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    throw new Error("OMDB_API_KEY environment variable is not set");
  }

  return new OMDBClient(apiKey);
}
