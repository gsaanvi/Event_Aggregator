"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, Bookmark, Search, Bell, User } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <CalendarDays className="size-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">CampusEvents</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Feed</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-primary">
            <Link href="/my-list" className="flex items-center gap-1.5">
              <Bookmark className="size-4" />
              My List
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/calendar">Calendar</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
            <Search className="size-4" />
            <span className="sr-only">Search events</span>
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
            <Bell className="size-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
            <User className="size-4" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
