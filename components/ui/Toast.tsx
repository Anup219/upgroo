"use client";

import * as React from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
  onClose: (id: string) => void;
}

export function Toast({ id, title, message, type = "info", onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-[var(--color-pk-success)]" />,
    error: <AlertCircle className="h-5 w-5 text-[var(--color-pk-danger)]" />,
    info: <Info className="h-5 w-5 text-[var(--color-pk-accent)]" />,
  };

  return (
    <div className="pointer-events-auto flex w-full max-w-md rounded-lg border border-[var(--color-pk-border)] bg-[var(--color-pk-surface-elevated)] shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="flex w-0 flex-1 items-start p-4">
        <div className="flex-shrink-0 pt-0.5">{icons[type]}</div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-[var(--color-pk-text-primary)]">{title}</p>
          {message && <p className="mt-1 text-sm text-[var(--color-pk-text-secondary)]">{message}</p>}
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            type="button"
            className="inline-flex rounded-md bg-transparent text-[var(--color-pk-text-secondary)] hover:text-[var(--color-pk-text-primary)] focus:outline-none"
            onClick={() => onClose(id)}
          >
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple Toast Provider/Hook system placeholder for Phase 1
// In a full app, we'd use a context provider to manage state.
// For now, we'll keep it structural.
