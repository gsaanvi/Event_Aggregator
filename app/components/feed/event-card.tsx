"use client";

import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Event {
  id: string;
  title: string;
  category: "cultural" | "technical" | "sports" | "workshop" | "other";
  date: string;
  time: string;
  venue: string;
  organizer: string;
  college: string | null;
  tags: string[];
  registrationLink: string;
}

const categoryConfig = {
  cultural: {
    label: "Cultural",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  technical: {
    label: "Technical",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  sports: {
    label: "Sports",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  workshop: {
    label: "Workshop",
    className: "bg-teal-100 text-teal-700 border-teal-200",
  },
  other: {
    label: "Other",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
};

interface EventCardProps {
  event: Event;
  isSaved: boolean;
  onToggleSave: (eventId: string, isCurrentlySaved: boolean) => void;
  onKnowMore: (eventId: string) => void;
  onRegister: (registrationLink: string) => void;
  isSaving?: boolean;
}

export function EventCard({
  event,
  isSaved,
  onToggleSave,
  onKnowMore,
  onRegister,
  isSaving = false,
}: EventCardProps) {
  const categoryStyle = categoryConfig[event.category];

  return (
    <Card className="group gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-4 p-5">
        {/* Category Badge */}
        <div className="flex items-start justify-between">
          <Badge
            variant="outline"
            className={`font-medium ${categoryStyle.className}`}
          >
            {categoryStyle.label}
          </Badge>
        </div>

        {/* Event Title */}
        <h3 className="text-balance text-lg font-bold leading-tight text-foreground">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="size-4 shrink-0 text-muted-foreground" />
          <span className="font-medium text-foreground">{event.organizer}</span>
          <span className="text-muted-foreground">
            {event.college ? `• ${event.college}` : "• In-house"}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 border-t pt-4">
          <Button
            variant={isSaved ? "secondary" : "outline"}
            size="sm"
            onClick={() => onToggleSave(event.id, isSaved)}
            disabled={isSaving}
            className={
              isSaved
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : ""
            }
          >
            {isSaved ? (
              <BookmarkCheck className="size-4" />
            ) : (
              <Bookmark className="size-4" />
            )}
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button size="sm" onClick={() => onRegister(event.registrationLink)}>
            <ExternalLink className="size-4" />
            Register
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onKnowMore(event.id)}>
            <Info className="size-4" />
            Know more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
