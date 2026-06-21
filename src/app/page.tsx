import { Background } from "@/components/Background";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";

export default function Home() {
  return (
    <>
      <Header />
      <main className="site-main">
        <Hero />
        <Projects />
        <Research />
        <Background />
        <Contact />
      </main>
    </>
  );
}