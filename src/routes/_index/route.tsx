import { ScrollArea } from "@radix-ui/react-scroll-area";
import type { Route } from "./+types/route";
import { Intro } from "@/routes/_index/sections/Intro";

export function meta({}: Route.MetaArgs) {
  return [{ title: "the whole internet (really)" }];
}

export default function IndexPage() {
  return (
    <ScrollArea className="h-screen">
      <div className="p-4 pb-500">
        <Intro />
      </div>
    </ScrollArea>
  );
}
