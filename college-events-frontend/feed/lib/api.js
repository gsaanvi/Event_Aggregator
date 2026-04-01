const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sb-token");
}

function buildUrl(path, queryParams = {}) {
  const url = new URL(path, API_BASE_URL);
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "all") {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  const text = await response.text();
  return text ? { message: text } : {};
}

async function request(path, { method = "GET", body, auth = false, query } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
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

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Request failed.");
  }
  return data;
}

export async function fetchEvents({ search, category, college } = {}) {
  return request("/api/events", {
    query: { search, category, college },
  });
}

export async function getSavedEvents() {
  return request("/api/saved", { auth: true });
}

export async function saveEvent(eventId) {
  return request("/api/saved", {
    method: "POST",
    auth: true,
    body: { event_id: eventId },
  });
}

export async function unsaveEvent(eventId) {
  return request(`/api/saved/${eventId}`, {
    method: "DELETE",
    auth: true,
  });
}
