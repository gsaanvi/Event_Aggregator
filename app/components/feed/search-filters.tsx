"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  searchEvent: string;
  setSearchEvent: (value: string) => void;
  searchCollege: string;
  setSearchCollege: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
}

export function SearchFilters({
  searchEvent,
  setSearchEvent,
  searchCollege,
  setSearchCollege,
  category,
  setCategory,
}: SearchFiltersProps) {
  return (
    <div className="w-full border-b bg-card py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by event name"
              value={searchEvent}
              onChange={(e) => setSearchEvent(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by college name"
              value={searchCollege}
              onChange={(e) => setSearchCollege(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
