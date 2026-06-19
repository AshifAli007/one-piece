import { Cinematic } from "@/components/sections/cinematic";
import { BackgroundMusic } from "@/components/background-music";

export default function Home() {
  return (
    <main id="top" className="relative">
      <BackgroundMusic />
      <Cinematic />
    </main>
  );
}
