import * as React from "react";
import { cn } from "@/lib/utils";
export function Badge({ className, ...p }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-2.5 py-0.5 text-xs font-medium text-muted-foreground", className)} {...p} />;
}
