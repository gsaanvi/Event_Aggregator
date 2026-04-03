import { Navbar } from "../land/components/navbar";
import { Hero } from "../land/components/hero";
import { Features } from "../land/components/features";
import { Footer } from "../land/components/footer";

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
