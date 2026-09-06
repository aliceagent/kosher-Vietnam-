import {
  Destinations,
  Hero,
  Inquire,
  Journeys,
  PromiseSection,
  SiteFooter,
  SiteHeader,
} from "@/components/home";
import { RevealObserver } from "@/components/reveal-observer";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <SiteHeader />
      <main>
        <Hero />
        <PromiseSection />
        <Destinations />
        <Journeys />
        <Inquire />
      </main>
      <SiteFooter />
    </>
  );
}
