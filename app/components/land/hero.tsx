import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="flex flex-col items-center text-center">
        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Find every event on campus
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
          One place to discover, save, and register for college events — no more missing out.
        </p>
        
        <div className="mt-10 w-full max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events, categories, colleges..."
              className="w-full rounded-lg border border-border bg-input py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <Button 
          size="lg" 
          className="mt-6 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
        >
          Browse Events
        </Button>
      </div>
    </section>
  )
}
