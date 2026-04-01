"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { SavedEventCard } from "@/components/saved-event-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import { Bookmark, CalendarSearch } from "lucide-react"

interface SavedEvent {
  id: string
  category: string
  title: string
  date: string
  venue: string
  organizer: string
}

const initialEvents: SavedEvent[] = [
  {
    id: "1",
    category: "Workshop",
    title: "Introduction to Machine Learning with Python",
    date: "Apr 5, 2026 • 2:00 PM",
    venue: "Engineering Building, Room 302",
    organizer: "CS Club",
  },
  {
    id: "2",
    category: "Social",
    title: "Spring Festival & Food Truck Rally",
    date: "Apr 12, 2026 • 11:00 AM",
    venue: "Main Quad",
    organizer: "Student Council",
  },
  {
    id: "3",
    category: "Career",
    title: "Tech Industry Networking Night",
    date: "Apr 18, 2026 • 6:00 PM",
    venue: "Business School Atrium",
    organizer: "Career Services",
  },
]

export default function MyListPage() {
  const { profile, loading } = useAuth()
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>(initialEvents)

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  if (!profile) {
    return null
  }

  const handleRemove = (id: string) => {
    setSavedEvents((events) => events.filter((event) => event.id !== id))
  }

  const handleRegister = (id: string) => {
    console.log("[v0] Registering for event:", id)
  }

  const handleBrowseEvents = () => {
    console.log("[v0] Navigate to browse events")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">My List</h1>
          <Badge variant="secondary" className="text-sm font-medium">
            {savedEvents.length}
          </Badge>
        </div>

        {savedEvents.length === 0 ? (
          <Empty className="mt-16 border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Bookmark className="size-5" />
              </EmptyMedia>
              <EmptyTitle>No saved events yet</EmptyTitle>
              <EmptyDescription>
                Events you save will appear here. Start exploring to find events that interest you.
              </EmptyDescription>
            </EmptyHeader>
            <Button onClick={handleBrowseEvents} className="gap-2">
              <CalendarSearch className="size-4" />
              Browse Events
            </Button>
          </Empty>
        ) : (
          <div className="flex flex-col gap-4">
            {savedEvents.map((event) => (
              <SavedEventCard
                key={event.id}
                category={event.category}
                title={event.title}
                date={event.date}
                venue={event.venue}
                organizer={event.organizer}
                onRemove={() => handleRemove(event.id)}
                onRegister={() => handleRegister(event.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
