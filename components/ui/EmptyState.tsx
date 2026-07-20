import * as React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-[var(--color-pk-border)] bg-[var(--color-pk-surface)]/50 p-8 text-center">
      {Icon && (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-pk-surface-elevated)]">
          <Icon className="h-6 w-6 text-[var(--color-pk-text-secondary)]" />
        </div>
      )}
      <h3 className="mb-2 text-lg font-medium text-[var(--color-pk-text-primary)]">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-[var(--color-pk-text-secondary)]">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
