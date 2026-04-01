"use client";

import Link from "next/link";
import { CalendarDays, LogOut, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <CalendarDays className="size-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            CampusConnect
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              <span className="hidden sm:inline">Feed</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/my-list" className="flex items-center gap-2">
              <List className="size-4" />
              <span className="hidden sm:inline">My List</span>
            </Link>
          </Button>
          <Button variant="ghost" className="text-muted-foreground">
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
