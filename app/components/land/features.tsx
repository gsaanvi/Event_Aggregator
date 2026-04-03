import { LayoutGrid, Bookmark, Bell } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: LayoutGrid,
    title: "Browse Events",
    description: "Explore hundreds of events across campus in one place.",
  },
  {
    icon: Bookmark,
    title: "Save to My List",
    description: "Bookmark events you love and never lose track.",
  },
  {
    icon: Bell,
    title: "Get Reminders",
    description: "Get notified before your saved events start.",
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card 
            key={feature.title} 
            className="border border-border bg-card transition-shadow hover:shadow-md"
          >
            <CardContent className="flex flex-col items-center p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
