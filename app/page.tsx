"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { DefaultChatTransport } from "ai";
import {
  ChatHeader,
  ChatInput,
  ErrorBanner,
  MessagesList,
  SuggestionsGrid,
} from "@/components/chat";

export default function Home() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });
  const [input, setInput] = useState("");
  const [showDiscordAd, setShowDiscordAd] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show Discord modal after first movie recommendation
  useEffect(() => {
    const hasShownAd = localStorage.getItem("discord-ad-shown");
    if (hasShownAd) return;

    // Check if there's a completed movie recommendation
    const hasMovieRecommendation = messages.some((message) =>
      message.parts?.some(
        (part: any) =>
          part.type === "tool-recommendMovie" &&
          part.state === "output-available"
      )
    );

    if (hasMovieRecommendation) {
      // Wait a bit for user to see the movie card, then show ad
      setTimeout(() => {
        setShowDiscordAd(true);
        localStorage.setItem("discord-ad-shown", "true");
      }, 2000);
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    sendMessage({
      role: "user",
      parts: [{ type: "text", text }],
    });
  };

  const handlePromptSelect = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background font-sans">
      <div className="flex flex-col w-full h-full">
        <ChatHeader
          showDiscordAd={showDiscordAd}
          onCloseDiscordAd={() => setShowDiscordAd(false)}
        />

        {/* Messages - Scrollable area */}
        <div className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 py-8">
              <div className="w-full max-w-3xl space-y-8">
                <div className="text-center mb-6 max-w-xl mx-auto">
                  <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
                    Find your next movie
                  </h1>
                  <p className="text-base text-muted-foreground">
                    Ask for recommendations, get movie cards instead of text.
                  </p>
                </div>

                <div className="flex justify-center">
                  <form onSubmit={handleSubmit} className="w-full max-w-2xl">
                    <div className="relative rounded-lg border border-input bg-white dark:bg-zinc-950 focus-within:ring-2 focus-within:ring-ring">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for movie recommendations..."
                        disabled={status === "streaming"}
                        rows={3}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (input.trim()) {
                              handleSubmit(e);
                            }
                          }
                        }}
                        className="w-full px-4 py-3 pr-20 text-sm text-foreground placeholder:text-muted-foreground bg-transparent resize-none focus:outline-none disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={status === "streaming" || !input.trim()}
                        className="absolute bottom-3 right-3 rounded-md bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or try
                    </span>
                  </div>
                </div>

                <SuggestionsGrid onSelectPrompt={handlePromptSelect} />
              </div>
            </div>
          ) : (
            <div className="px-6 py-6">
              <MessagesList
                messages={messages}
                isStreaming={status === "streaming"}
                messagesEndRef={messagesEndRef}
              />
            </div>
          )}
        </div>

        {/* Error banner and input form - Fixed at bottom (only when messages exist) */}
        {messages.length > 0 && (
          <div className="flex-shrink-0 border-t border-border bg-background">
            {error && <ErrorBanner />}
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              disabled={status === "streaming"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
