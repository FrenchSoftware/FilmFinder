interface SuggestionCardProps {
  title: string;
  description: string;
  prompt: string;
  onSelect: (prompt: string) => void;
}

function SuggestionCard({ title, description, prompt, onSelect }: SuggestionCardProps) {
  return (
    <button
      onClick={() => onSelect(prompt)}
      className="group relative rounded-lg border border-border bg-white dark:bg-card p-3 text-left transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-primary/50 dark:hover:bg-accent cursor-pointer"
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-sm text-card-foreground leading-tight">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-snug">
          {description}
        </p>
      </div>
    </button>
  );
}


interface SuggestionsGridProps {
  onSelectPrompt: (prompt: string) => void;
}

export function SuggestionsGrid({ onSelectPrompt }: SuggestionsGridProps) {
  const suggestions = [
    {
      title: 'Blade Runner vibes',
      description: 'Sci-fi that makes you think',
      prompt: 'Something like Blade Runner or Ex Machina',
    },
    {
      title: 'Cinema Paradiso feels',
      description: 'Nostalgic Italian cinema',
      prompt: 'Beautiful nostalgic films like Cinema Paradiso',
    },
    {
      title: 'Nolan mindfuck',
      description: 'Time loops and "wait what" moments',
      prompt: 'Something that messes with time like Nolan films',
    },
    {
      title: 'Hong Kong action',
      description: 'Jackie Chan, John Woo style',
      prompt: 'Classic Hong Kong action movies',
    },
  ];

  return (
    <div className="flex flex-col items-center px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl mx-auto">
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.prompt}
            {...suggestion}
            onSelect={onSelectPrompt}
          />
        ))}
      </div>
    </div>
  );
}
