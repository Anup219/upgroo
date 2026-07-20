"use client";

import * as React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal panel */}
      <div className="relative z-50 w-full max-w-lg rounded-xl border border-[var(--color-pk-border)] bg-[var(--color-pk-surface-elevated)] p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          {title && (
            <h2 className="text-lg font-semibold text-[var(--color-pk-text-primary)]">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[var(--color-pk-text-secondary)] hover:bg-[var(--color-pk-surface)] hover:text-[var(--color-pk-text-primary)] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
