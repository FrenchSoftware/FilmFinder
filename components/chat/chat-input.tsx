import { FormEvent, KeyboardEvent } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = 'Ask for movie recommendations...',
}: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit(e as any);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="px-6 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-lg border border-input bg-white dark:bg-zinc-950 transition-all hover:border-foreground/20 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={2}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 pr-20 text-sm text-foreground placeholder:text-muted-foreground bg-transparent resize-none focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="absolute bottom-2 right-2 rounded-md bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
        </div>
      </div>
    </form>
  );
}
