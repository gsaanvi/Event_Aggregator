"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";

type Event = {
  id: string;
  title: string;
  date: string;
  category: string;
  saves: number;
  reminders: number;
};

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Spring Career Fair 2026",
    date: "Apr 15, 2026",
    category: "Career",
    saves: 342,
    reminders: 218,
  },
  {
    id: "2",
    title: "AI & Machine Learning Workshop",
    date: "Apr 8, 2026",
    category: "Workshop",
    saves: 156,
    reminders: 89,
  },
  {
    id: "3",
    title: "Campus Music Festival",
    date: "Apr 22, 2026",
    category: "Entertainment",
    saves: 521,
    reminders: 384,
  },
  {
    id: "4",
    title: "Student Government Elections",
    date: "Apr 10, 2026",
    category: "Campus Life",
    saves: 265,
    reminders: 165,
  },
];

const categoryColors: Record<string, string> = {
  Career: "bg-primary/10 text-primary border-primary/20",
  Workshop: "bg-accent/10 text-accent border-accent/20",
  Entertainment: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  "Campus Life": "bg-chart-4/10 text-chart-4 border-chart-4/20",
};

export function EventsTable() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    setDeletingId(null);
  };

  const handleEdit = (id: string) => {
    // Placeholder for edit functionality
    console.log("Edit event:", id);
  };

  const handleCreateEvent = () => {
    // Placeholder for create functionality
    console.log("Create new event");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">All Events</CardTitle>
        <Button onClick={handleCreateEvent} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-foreground">Title</TableHead>
                <TableHead className="font-semibold text-foreground">Date</TableHead>
                <TableHead className="font-semibold text-foreground">Category</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Saves</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Reminders</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-foreground">
                    {event.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {event.date}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={categoryColors[event.category] || "bg-secondary text-secondary-foreground"}
                    >
                      {event.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {event.saves.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {event.reminders.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {deletingId === event.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm text-muted-foreground mr-2">
                          Are you sure?
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(event.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => setDeletingId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          onClick={() => handleEdit(event.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeletingId(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No events found</p>
            <Button onClick={handleCreateEvent} variant="link" className="mt-2">
              Create your first event
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
