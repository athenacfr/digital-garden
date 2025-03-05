import type { TextRainbowProps } from "@/components/TextRainbow/types";
import { cx } from "class-variance-authority";

export function TextRainbow({
  children,
  className,
  ...props
}: TextRainbowProps) {
  return (
    <span className={cx("text-rainbow animate-bg-wave", className)} {...props}>
      {children}
    </span>
  );
}
