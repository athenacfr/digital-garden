import { CubeCanvas } from "@/components/CubeCanvas";
import { CursorBackground } from "@/components/CursorBackground";
import { TextBounce } from "@/components/TextBounce";
import { TextRainbow } from "@/components/TextRainbow";
import { cx } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

export function Intro({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cx(
        "flex lg:flex-row flex-col gap-8 items-center justify-center",
        className
      )}
      {...props}
    >
      <div className="md:size-96 sm:size-72 size-48">
        <CursorBackground>
          <CubeCanvas className="h-full w-full" />
        </CursorBackground>
      </div>
      <div className="typography">
        <h1 className="text-2xl">
          <TextBounce>intro v0.1</TextBounce>
        </h1>
        <p>
          in a digital landscape dominated by massive companies with really
          polished UIs, something feels off.
        </p>
        <p>
          it feels like we've lost something in favor of the standard - the raw
          expression and personality that made the early web so exciting.
        </p>
        <p>
          although today's focus on accessibility is a welcome evolution, i
          think there is a balance where creativity meets usability.
        </p>
        <p>
          therefore this is my <TextRainbow>digital garden</TextRainbow> - a
          space where code meets art, reminiscent of early web.
        </p>
      </div>
    </div>
  );
}
