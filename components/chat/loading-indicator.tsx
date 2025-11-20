export function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-lg px-4 py-3 bg-muted border border-border">
        <div className="text-sm font-medium mb-2 opacity-70 text-muted-foreground">AI Assistant</div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span
              className="animate-bounce inline-block h-1.5 w-1.5 rounded-full bg-primary/60"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="animate-bounce inline-block h-1.5 w-1.5 rounded-full bg-primary/60"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="animate-bounce inline-block h-1.5 w-1.5 rounded-full bg-primary/60"
              style={{ animationDelay: '300ms' }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            Thinking...
          </span>
        </div>
      </div>
    </div>
  );
}
