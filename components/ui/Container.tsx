import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}
