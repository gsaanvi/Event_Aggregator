const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getSupabaseToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("sb-token");
}

function buildUrl(path, queryParams = {}) {
  const url = new URL(path, API_BASE_URL);
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
}

async function parseResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  const text = await response.text();
  return text ? { message: text } : {};
}

async function apiRequest(path, { method = "GET", body, auth = false, query } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getSupabaseToken();
    if (!token) {
      throw new Error("Authentication token not found.");
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Request failed.");
  }

  return data;
}

// Events
export async function fetchEvents({ search, category, college } = {}) {
  return apiRequest("/api/events", {
    query: { search, category, college },
  });
}

export async function fetchEventById(id) {
  return apiRequest(`/api/events/${id}`);
}

// Saved events
export async function getSavedEvents() {
  return apiRequest("/api/saved", { auth: true });
}

export async function saveEvent(eventId) {
  return apiRequest("/api/saved", {
    method: "POST",
    auth: true,
    body: { eventId },
  });
}

export async function unsaveEvent(eventId) {
  return apiRequest(`/api/saved/${eventId}`, {
    method: "DELETE",
    auth: true,
  });
}

// Reminders
export async function getReminders() {
  return apiRequest("/api/reminders", { auth: true });
}

export async function setReminder(eventId) {
  return apiRequest("/api/reminders", {
    method: "POST",
    auth: true,
    body: { eventId },
  });
}

export async function cancelReminder(eventId) {
  return apiRequest(`/api/reminders/${eventId}`, {
    method: "DELETE",
    auth: true,
  });
}

// Admin
export async function getAdminStats() {
  return apiRequest("/api/admin/stats", { auth: true });
}

export async function getAdminEvents() {
  return apiRequest("/api/admin/events", { auth: true });
}

export async function createEvent(data) {
  return apiRequest("/api/events", {
    method: "POST",
    auth: true,
    body: data,
  });
}

export async function updateEvent(id, data) {
  return apiRequest(`/api/events/${id}`, {
    method: "PUT",
    auth: true,
    body: data,
  });
}

export async function deleteEvent(id) {
  return apiRequest(`/api/events/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
