import { ReactNode, HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  containerClassName?: string;
  noContainer?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { children, className, containerClassName, noContainer = false, ...props },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn("section-padding w-full block", className)}
        {...props}
      >
        {noContainer ? (
          children
        ) : (
          <Container className={containerClassName}>{children}</Container>
        )}
      </section>
    );
  }
);

Section.displayName = "Section";
