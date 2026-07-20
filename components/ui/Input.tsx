import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-pk-text-secondary)] mb-1.5">
            {label}
          </label>
        )}
        <input
          type={type}
          className={`flex h-10 w-full rounded-md border border-[var(--color-pk-border)] bg-[var(--color-pk-surface)] px-3 py-2 text-sm text-[var(--color-pk-text-primary)] placeholder:text-[var(--color-pk-text-tertiary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-pk-accent)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
            error ? "border-[var(--color-pk-danger)] focus:ring-[var(--color-pk-danger)]" : ""
          } ${className}`}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-[var(--color-pk-danger)]">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
