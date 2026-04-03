import { EventForm } from "@/components/event-form"

export default function CreateEventPage() {
  return (
    <main className="min-h-screen bg-muted/40 px-4 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Event Management
          </h1>
          <p className="mt-2 text-muted-foreground">
            Create and manage events for your college community
          </p>
        </div>
        <EventForm />
      </div>
    </main>
  )
}
