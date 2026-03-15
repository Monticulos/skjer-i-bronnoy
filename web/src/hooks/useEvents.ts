import { useEffect, useState } from "react";
import type { Event, EventsData } from "../types/event";

const EVENTS_DATA_URL = "data/events.json";

interface UseEventsResult {
  events: Event[];
  updatedAt: string | null;
  loading: boolean;
  error: string | null;
}

export function useEvents(): UseEventsResult {
  const [events, setEvents] = useState<Event[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(EVENTS_DATA_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<EventsData>;
      })
      .then((data) => {
        setUpdatedAt(data.updatedAt);
        setEvents(data.events);
      })
      .catch((fetchError: Error) => setError(fetchError.message))
      .finally(() => setLoading(false));
  }, []);

  return { events, updatedAt, loading, error };
}
