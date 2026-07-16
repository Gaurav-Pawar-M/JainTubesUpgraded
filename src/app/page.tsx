import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Products from "@/components/Products";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative jt-watercolor-bg w-full min-h-screen text-jt-ink">
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
