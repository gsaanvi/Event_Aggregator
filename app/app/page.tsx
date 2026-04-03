import { Navbar } from "@/components/land/navbar";
import { Hero } from "@/components/land/hero";
import { Features } from "@/components/land/features";
import { Footer } from "@/components/land/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
