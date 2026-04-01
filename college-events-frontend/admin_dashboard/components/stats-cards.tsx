import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, Bell } from "lucide-react";

const stats = [
  {
    title: "Total Events",
    value: "24",
    icon: Calendar,
    description: "Active events this month",
    trend: "+3 from last week",
  },
  {
    title: "Total Saves",
    value: "1,284",
    icon: Heart,
    description: "Events saved by students",
    trend: "+12% this month",
  },
  {
    title: "Reminders Set",
    value: "856",
    icon: Bell,
    description: "Active event reminders",
    trend: "+8% this month",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <span className="text-xs font-medium text-accent">{stat.trend}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
