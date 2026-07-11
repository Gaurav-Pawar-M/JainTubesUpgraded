import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Products from "@/components/Products";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-gradient-to-b from-[#4b79c4] via-[#2c539e] to-[#07173b] w-full min-h-screen text-white">
      <Hero />
      <About />
      <Projects />
      <Products />
      <Clients />
      <Testimonials />
      <Contact />
    </main>
  );
}
