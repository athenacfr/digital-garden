import { useCursor } from "@/hooks/useCursor";
import { cx } from "class-variance-authority";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef, type ComponentPropsWithoutRef } from "react";

export function CursorBackground({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursor = useCursor(containerRef);
  const yLabel = useTransform(() => Math.floor(cursor.y.get()) + "px");
  const xLabel = useTransform(() => Math.floor(cursor.x.get()) + "px");

  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden border-neutral-800 border"
    >
      <div className="pointer-events-none z-0 select-none">
        <motion.div
          className="absolute border-neutral-800 border-t p-1 text-neutral-800"
          style={{
            width: cursor.x,
            left: 0,
            top: cursor.y,
            opacity: cursor.visible ? 1 : 0,
          }}
        >
          {yLabel}
        </motion.div>
        <motion.div
          className="absolute border-neutral-800 border-l p-1 text-neutral-800"
          style={{
            height: cursor.y,
            left: cursor.x,
            top: 0,
            opacity: cursor.visible ? 1 : 0,
          }}
        >
          {xLabel}
        </motion.div>
      </div>
      <div className={cx("z-1 w-full h-full isolate", className)} {...props}>
        {children}
      </div>
    </div>
  );
}
