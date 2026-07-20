import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "outline";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-pk-border)]";
  
  const variants = {
    default: "border-transparent bg-[var(--color-pk-surface-elevated)] text-[var(--color-pk-text-primary)]",
    success: "border-transparent bg-[var(--color-pk-success)]/10 text-[var(--color-pk-success)]",
    warning: "border-transparent bg-[var(--color-pk-warning)]/10 text-[var(--color-pk-warning)]",
    danger: "border-transparent bg-[var(--color-pk-danger)]/10 text-[var(--color-pk-danger)]",
    outline: "text-[var(--color-pk-text-secondary)] border-[var(--color-pk-border)]",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
  );
}
