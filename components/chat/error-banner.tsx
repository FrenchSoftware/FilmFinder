interface ErrorBannerProps {
  message?: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="px-6 pt-4">
      <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3">
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">
              Something went wrong
            </p>
            <p className="text-xs text-destructive/80 mt-1">
              {message || 'Failed to get a response from the AI. Please try again.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
