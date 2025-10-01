"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  themes?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      themes,
      ...props
    },
    ref,
  ) => {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          `bg-stone-200 relative h-4 w-full overflow-hidden rounded-full`,
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={`h-full w-full flex-1 transition-all`}
          style={{ transform: `translateX(-${100 - (value || 0)}%)`,backgroundColor:themes }}
        />
      </ProgressPrimitive.Root>
    );
  },
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };