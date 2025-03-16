import { CubeCanvas } from "@/components/CubeCanvas";
import type { Route } from "./+types/_index";
import { CursorBackground } from "@/components/CursorBackground";
import { TextBounce } from "@/components/TextBounce";
import { TextRainbow } from "@/components/TextRainbow";

export function meta({}: Route.MetaArgs) {
  return [{ title: "the whole internet (really)" }];
}

export default function IndexPage() {
  return (
    <div className="p-4">
      <CursorBackground className="flex lg:flex-row flex-col gap-8 items-center justify-center px-4 py-20">
        <CubeCanvas className="md:size-96 sm:size-72 size-48 border border-neutral-50 border-dashed" />
        <div className="typography">
          <h1 className="text-2xl">
            <TextBounce>internet design manifest v0.1</TextBounce>
          </h1>
          <p>
            in a digital landscape dominated by massive companies with really
            polished UIs, something feels off.
          </p>
          <p>
            it feels like we've lost something in favor of the standard - the
            raw expression and personality that made the early web so exciting.
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
      </CursorBackground>
    </div>
  );
}
