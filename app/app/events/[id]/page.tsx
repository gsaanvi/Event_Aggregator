"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Bookmark,
  ExternalLink,
  Bell,
  User,
} from "lucide-react";
import { Button } from "@/components/detail/ui/button";
import { Badge } from "@/components/detail/ui/badge";
import { Card, CardContent } from "@/components/detail/ui/card";

const eventData = {
  id: "evt-001",
  title: "AI & Machine Learning Workshop: Building Intelligent Applications",
  category: "Technology",
  organizer: "Computer Science Society",
  organizerType: "Student Club",
  college: "MIT School of Engineering",
  date: "Saturday, April 12, 2025",
  time: "10:00 AM - 4:00 PM",
  venue: "Innovation Lab, Building C, Room 301",
  description: `Join us for an immersive hands-on workshop exploring the fundamentals of Artificial Intelligence and Machine Learning. This full-day event is designed for students who want to dive deep into the world of intelligent systems and learn how to build practical AI applications.

The workshop will cover topics including neural networks, natural language processing, computer vision basics, and deploying ML models. You'll work with popular frameworks like TensorFlow and PyTorch, and by the end of the day, you'll have built your own image classification model.

No prior ML experience required, but basic Python knowledge is recommended. Laptops will be provided, but feel free to bring your own. Lunch and refreshments will be served.`,
  tags: ["Workshop", "AI", "Machine Learning", "Hands-on", "Beginner Friendly"],
  registrationLink: "https://example.com/register/ai-workshop",
};

export default function EventDetailPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [isReminderSet, setIsReminderSet] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleRegister = () => {
    window.open(eventData.registrationLink, "_blank", "noopener,noreferrer");
  };

  const handleReminder = () => {
    setIsReminderSet(!isReminderSet);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-6 pb-32 sm:px-6 lg:px-8">
        <Button variant="ghost" className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 size-4" />
          Back to Feed
        </Button>

        <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl text-balance">
          {eventData.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
            {eventData.category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Hosted by <span className="font-medium text-foreground">{eventData.organizer}</span>
          </span>
        </div>

        <Card className="mt-6 border-border/50">
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3 p-0 py-4 sm:py-5">
            <div className="flex items-start gap-3 px-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Calendar className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Date</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{eventData.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 px-5 sm:border-l sm:border-border/50">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Clock className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Time</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{eventData.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 px-5 sm:border-l sm:border-border/50">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <MapPin className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Venue</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{eventData.venue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">About this event</h2>
          <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted-foreground">
            {eventData.description.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">Tags</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {eventData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">Organizer</h2>
          <Card className="mt-3 border-border/50">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                <User className="size-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{eventData.organizer}</p>
                <p className="text-sm text-muted-foreground">
                  {eventData.organizerType} &middot; {eventData.college}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={isSaved ? "secondary" : "outline"}
                onClick={handleSave}
                className={
                  isSaved ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : ""
                }
              >
                <Bookmark className={`size-4 ${isSaved ? "fill-emerald-600" : ""}`} />
                <span className="hidden sm:inline">{isSaved ? "Saved ✓" : "Save to My List"}</span>
                <span className="sm:hidden">{isSaved ? "Saved ✓" : "Save"}</span>
              </Button>

              <Button onClick={handleRegister} className="bg-foreground text-background hover:bg-foreground/90">
                <ExternalLink className="size-4" />
                <span>Register</span>
              </Button>

              <Button
                variant={isReminderSet ? "secondary" : "outline"}
                onClick={handleReminder}
                className={
                  isReminderSet ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" : ""
                }
              >
                <Bell className={`size-4 ${isReminderSet ? "fill-amber-500" : ""}`} />
                <span className="hidden sm:inline">
                  {isReminderSet ? "Reminder Set 🔔" : "Set Reminder"}
                </span>
                <span className="sm:hidden">{isReminderSet ? "Set 🔔" : "Remind"}</span>
              </Button>
            </div>
            {isReminderSet && (
              <p className="text-center text-xs text-muted-foreground">
                You&apos;ll receive an email 24 hours before this event.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
