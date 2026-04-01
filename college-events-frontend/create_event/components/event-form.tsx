"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  venue: string
  category: string
  tags: string
  registrationLink: string
  organizerName: string
  organizerCollege: string
  maxSeats: string
}

interface FormErrors {
  title?: string
  description?: string
  date?: string
  time?: string
  venue?: string
  category?: string
  organizerName?: string
}

const initialFormData: EventFormData = {
  title: "",
  description: "",
  date: "",
  time: "",
  venue: "",
  category: "",
  tags: "",
  registrationLink: "",
  organizerName: "",
  organizerCollege: "",
  maxSeats: "",
}

export function EventForm() {
  const [formData, setFormData] = useState<EventFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    if (!formData.date) {
      newErrors.date = "Date is required"
    }
    if (!formData.time) {
      newErrors.time = "Time is required"
    }
    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required"
    }
    if (!formData.category) {
      newErrors.category = "Category is required"
    }
    if (!formData.organizerName.trim()) {
      newErrors.organizerName = "Organizer name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    // Reset form or redirect
  }

  const handleCancel = () => {
    setFormData(initialFormData)
    setErrors({})
  }

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Create Event</CardTitle>
        <CardDescription>
          Fill in the details below to create a new event for your college.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Event Title */}
            <Field data-invalid={!!errors.title}>
              <FieldLabel htmlFor="title">
                Event Title <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="title"
                type="text"
                placeholder="Enter event title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                aria-invalid={!!errors.title}
              />
              {errors.title && <FieldError>{errors.title}</FieldError>}
            </Field>

            {/* Description */}
            <Field data-invalid={!!errors.description}>
              <FieldLabel htmlFor="description">
                Description <span className="text-destructive">*</span>
              </FieldLabel>
              <Textarea
                id="description"
                placeholder="Describe the event..."
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <FieldError>{errors.description}</FieldError>
              )}
            </Field>

            {/* Date and Time */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field data-invalid={!!errors.date}>
                <FieldLabel htmlFor="date">
                  Date <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  aria-invalid={!!errors.date}
                />
                {errors.date && <FieldError>{errors.date}</FieldError>}
              </Field>

              <Field data-invalid={!!errors.time}>
                <FieldLabel htmlFor="time">
                  Time <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  aria-invalid={!!errors.time}
                />
                {errors.time && <FieldError>{errors.time}</FieldError>}
              </Field>
            </div>

            {/* Venue */}
            <Field data-invalid={!!errors.venue}>
              <FieldLabel htmlFor="venue">
                Venue <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="venue"
                type="text"
                placeholder="e.g., Main Auditorium, Block A"
                value={formData.venue}
                onChange={(e) => handleInputChange("venue", e.target.value)}
                aria-invalid={!!errors.venue}
              />
              {errors.venue && <FieldError>{errors.venue}</FieldError>}
            </Field>

            {/* Category */}
            <Field data-invalid={!!errors.category}>
              <FieldLabel htmlFor="category">
                Category <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger
                  id="category"
                  className="w-full"
                  aria-invalid={!!errors.category}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <FieldError>{errors.category}</FieldError>}
            </Field>

            {/* Tags */}
            <Field>
              <FieldLabel htmlFor="tags">Tags</FieldLabel>
              <Input
                id="tags"
                type="text"
                placeholder="e.g., music, dance, competition"
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
              />
              <FieldDescription>Separate tags with commas</FieldDescription>
            </Field>

            {/* Registration Link */}
            <Field>
              <FieldLabel htmlFor="registrationLink">
                Registration Link
              </FieldLabel>
              <Input
                id="registrationLink"
                type="url"
                placeholder="https://forms.gle/..."
                value={formData.registrationLink}
                onChange={(e) =>
                  handleInputChange("registrationLink", e.target.value)
                }
              />
            </Field>

            {/* Organizer Name */}
            <Field data-invalid={!!errors.organizerName}>
              <FieldLabel htmlFor="organizerName">
                Organizer Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="organizerName"
                type="text"
                placeholder="Name of organizing club or committee"
                value={formData.organizerName}
                onChange={(e) =>
                  handleInputChange("organizerName", e.target.value)
                }
                aria-invalid={!!errors.organizerName}
              />
              {errors.organizerName && (
                <FieldError>{errors.organizerName}</FieldError>
              )}
            </Field>

            {/* Organizer College */}
            <Field>
              <FieldLabel htmlFor="organizerCollege">
                Organizer College
              </FieldLabel>
              <Input
                id="organizerCollege"
                type="text"
                placeholder="e.g., MIT, Stanford"
                value={formData.organizerCollege}
                onChange={(e) =>
                  handleInputChange("organizerCollege", e.target.value)
                }
              />
              <FieldDescription>Leave blank if in-house event</FieldDescription>
            </Field>

            {/* Max Seats */}
            <Field>
              <FieldLabel htmlFor="maxSeats">Max Seats</FieldLabel>
              <Input
                id="maxSeats"
                type="number"
                placeholder="e.g., 100"
                min={1}
                value={formData.maxSeats}
                onChange={(e) => handleInputChange("maxSeats", e.target.value)}
              />
              <FieldDescription>
                Optional — leave empty for unlimited seats
              </FieldDescription>
            </Field>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Event"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
