'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Star } from "lucide-react";

interface MovieCardProps {
  title: string;
  year: number;
  rating: number;
  plot: string;
  posterUrl: string;
  imdbId: string;
  genre: string[];
}

export function MovieCard({
  title,
  year,
  rating,
  plot,
  posterUrl,
  imdbId,
  genre,
}: MovieCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden max-w-xs !pt-0 bg-white dark:bg-card flex flex-col h-full">
        <div
          className="relative h-40 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer group flex-shrink-0"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={posterUrl}
            alt={`${title} poster`}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
              Click to zoom
            </span>
          </div>
        </div>
        <CardHeader className="flex-shrink-0">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight">{title}</CardTitle>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 shrink-0 text-xs"
            >
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </Badge>
          </div>
          <CardDescription className="text-sm mt-1">{year}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex flex-wrap gap-1 mb-2">
            {genre.slice(0, 3).map((g) => (
              <Badge key={g} variant="outline" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {plot}
          </p>
        </CardContent>
        <CardFooter className="pt-0 flex-shrink-0 mt-auto">
          <a
            href={`https://www.imdb.com/title/${imdbId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-black dark:text-white hover:underline"
          >
            View on IMDb
            <ExternalLink className="h-3 w-3" />
          </a>
        </CardFooter>
      </Card>

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">{title} Poster</DialogTitle>
        <div className="relative w-full">
          <img
            src={posterUrl}
            alt={`${title} poster`}
            className="w-full h-auto max-h-[85vh] object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

export function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden max-w-xs !pt-0 bg-white dark:bg-card flex flex-col h-full">
      <div className="relative h-40 w-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 animate-pulse flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-5 w-10 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse shrink-0" />
        </div>
        <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mt-1" />
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex gap-1 mb-2">
          <div className="h-4 w-14 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex-shrink-0 mt-auto">
        <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}
