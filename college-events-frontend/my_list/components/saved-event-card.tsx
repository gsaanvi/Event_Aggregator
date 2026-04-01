"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Users, Trash2 } from "lucide-react"

interface SavedEventCardProps {
  category: string
  title: string
  date: string
  venue: string
  organizer: string
  onRemove: () => void
  onRegister: () => void
}

const categoryColors: Record<string, string> = {
  Workshop: "bg-chart-1/15 text-chart-1 border-chart-1/30",
  Social: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  Academic: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  Sports: "bg-chart-4/15 text-chart-4 border-chart-4/30",
  Career: "bg-chart-5/15 text-chart-5 border-chart-5/30",
}

export function SavedEventCard({
  category,
  title,
  date,
  venue,
  organizer,
  onRemove,
  onRegister,
}: SavedEventCardProps) {
  const colorClass = categoryColors[category] || categoryColors.Workshop

  return (
    <Card className="flex flex-col gap-0 py-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className={`${colorClass} border font-medium`}
          >
            {category}
          </Badge>
        </div>
        
        <h3 className="text-lg font-semibold leading-tight text-foreground">
          {title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {venue}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-4" />
            {organizer}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t p-4 sm:border-l sm:border-t-0 sm:p-5">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRemove}
          className="gap-1.5"
        >
          <Trash2 className="size-4" />
          Remove
        </Button>
        <Button 
          size="sm" 
          onClick={onRegister}
        >
          Register
        </Button>
      </div>
    </Card>
  )
}
