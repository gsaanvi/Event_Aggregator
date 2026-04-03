"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { SearchFilters } from "@/components/search-filters";
import { EventCard, type Event } from "@/components/event-card";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { fetchEvents, getSavedEvents, saveEvent, unsaveEvent } from "@/lib/api";

type ApiEvent = {
  id: string | number;
  title: string;
  category?: string | null;
  date?: string | null;
  time?: string | null;
  venue?: string | null;
  organizer_name?: string | null;
  organizer_college?: string | null;
  tags?: string[] | null;
  registration_link?: string | null;
};

const allowedCategories: Event["category"][] = [
  "cultural",
  "technical",
  "sports",
  "workshop",
  "other",
];

function toEventCategory(category?: string | null): Event["category"] {
  if (!category) return "other";
  const normalized = category.toLowerCase() as Event["category"];
  return allowedCategories.includes(normalized) ? normalized : "other";
}

function mapApiEvent(evt: ApiEvent): Event {
  return {
    id: String(evt.id),
    title: evt.title ?? "Untitled event",
    category: toEventCategory(evt.category),
    date: evt.date ?? "TBA",
    time: evt.time ?? "TBA",
    venue: evt.venue ?? "Venue TBA",
    organizer: evt.organizer_name ?? "Organizer",
    college: evt.organizer_college ?? null,
    tags: Array.isArray(evt.tags) ? evt.tags : [],
    registrationLink: evt.registration_link ?? "#",
  };
}

export default function EventFeedPage() {
  const router = useRouter();
  const { profile, loading } = useAuth();
  const [searchEvent, setSearchEvent] = useState("");
  const [searchCollege, setSearchCollege] = useState("");
  const [category, setCategory] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [savedEventIds, setSavedEventIds] = useState<Set<string>>(new Set());
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);
  const [isFetchingSaved, setIsFetchingSaved] = useState(true);
  const [savingEventIds, setSavingEventIds] = useState<Set<string>>(new Set());
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadEvents = async () => {
      if (!profile) return;
      setIsFetchingEvents(true);
      setFetchError(null);
      try {
        const data = await fetchEvents({
          search: searchEvent,
          category,
          college: searchCollege,
        });
        const nextEvents = Array.isArray(data?.events)
          ? data.events.map((evt: ApiEvent) => mapApiEvent(evt))
          : [];
        if (!ignore) {
          setEvents(nextEvents);
        }
      } catch (error) {
        if (!ignore) {
          setFetchError(
            error instanceof Error ? error.message : "Failed to load events."
          );
          setEvents([]);
        }
      } finally {
        if (!ignore) {
          setIsFetchingEvents(false);
        }
      }
    };

    loadEvents();
    return () => {
      ignore = true;
    };
  }, [profile, searchEvent, searchCollege, category]);

  useEffect(() => {
    let ignore = false;

    const loadSavedEvents = async () => {
      if (!profile) return;
      setIsFetchingSaved(true);
      try {
        const data = await getSavedEvents();
        const ids = new Set<string>(
          Array.isArray(data?.events)
            ? data.events.map((event: ApiEvent) => String(event.id))
            : []
        );
        if (!ignore) {
          setSavedEventIds(ids);
        }
      } catch {
        if (!ignore) {
          setSavedEventIds(new Set());
        }
      } finally {
        if (!ignore) {
          setIsFetchingSaved(false);
        }
      }
    };

    loadSavedEvents();
    return () => {
      ignore = true;
    };
  }, [profile]);

  const handleToggleSave = async (eventId: string, isCurrentlySaved: boolean) => {
    setSavingEventIds((prev: Set<string>) => {
      const next = new Set(prev);
      next.add(eventId);
      return next;
    });

    try {
      if (isCurrentlySaved) {
        await unsaveEvent(eventId);
        setSavedEventIds((prev: Set<string>) => {
          const next = new Set(prev);
          next.delete(eventId);
          return next;
        });
      } else {
        await saveEvent(eventId);
        setSavedEventIds((prev: Set<string>) => new Set(prev).add(eventId));
      }
    } catch {
      // Keep current UI state if save request fails.
    } finally {
      setSavingEventIds((prev: Set<string>) => {
        const next = new Set(prev);
        next.delete(eventId);
        return next;
      });
    }
  };

  const handleKnowMore = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  const handleRegister = (registrationLink: string) => {
    window.open(registrationLink, "_blank", "noopener,noreferrer");
  };

  const showPageLoading = isFetchingEvents || isFetchingSaved;
  const filteredEvents = useMemo(() => events, [events]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SearchFilters
        searchEvent={searchEvent}
        setSearchEvent={setSearchEvent}
        searchCollege={searchCollege}
        setSearchCollege={setSearchCollege}
        category={category}
        setCategory={setCategory}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Upcoming Events
          </h1>
          <p className="text-sm text-muted-foreground">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {showPageLoading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner className="size-6" />
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event: Event) => (
              <EventCard
                key={event.id}
                event={event}
                isSaved={savedEventIds.has(event.id)}
                isSaving={savingEventIds.has(event.id)}
                onToggleSave={handleToggleSave}
                onKnowMore={handleKnowMore}
                onRegister={handleRegister}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <svg
                className="size-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              No events found
            </h2>
            <p className="text-muted-foreground">
              {fetchError ?? "Try adjusting your search or filter criteria"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
