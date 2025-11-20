"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChatHeaderProps {
  showDiscordAd?: boolean;
  onCloseDiscordAd?: () => void;
}

export function ChatHeader({
  showDiscordAd = false,
  onCloseDiscordAd,
}: ChatHeaderProps) {
  const [isDiscordOpen, setIsDiscordOpen] = useState(false);

  // Handle ad trigger from parent
  useEffect(() => {
    if (showDiscordAd) {
      setIsDiscordOpen(true);
    }
  }, [showDiscordAd]);

  const handleClose = (open: boolean) => {
    setIsDiscordOpen(open);
    if (!open && onCloseDiscordAd) {
      onCloseDiscordAd();
    }
  };

  return (
    <>
      <div className="flex-shrink-0 border-b border-border bg-background">
        <div className="px-6 py-5">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              {/* Left side - Branding */}
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎞️</div>
                <div>
                  <h1 className="text-2xl font-bebas tracking-wider text-foreground">
                    FILMFINDER
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Your next favorite film
                  </p>
                </div>
              </div>

              {/* Right side - Actions */}
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <a
                    href="https://github.com/FrenchSoftware/FilmFinder"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Star className="w-4 h-4" />
                    <span className="hidden sm:inline">Star on GitHub</span>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white dark:bg-transparent"
                >
                  <a
                    href="https://discord.com/invite/HXkpCG7DEH"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DiscordIcon />
                    <span className="hidden sm:inline">Join Community</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDiscordOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join the community</DialogTitle>
            <DialogDescription asChild>
              <div>
                <p>
                  Connect with other movie enthusiasts, share recommendations, and discuss films.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full" size="sm">
              <a
                href="https://discord.com/invite/HXkpCG7DEH"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <DiscordIcon />
                Join Discord Server
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DiscordIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
