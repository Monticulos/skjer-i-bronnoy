import { describe, it, expect } from "vitest";
import { mapEventsToCalendar } from "./mapEventsToCalendar";
import type { Event } from "../types/event";

const createEvent = (overrides: Partial<Event> = {}): Event => ({
  id: "1",
  title: "Test Event",
  description: "A test event",
  category: "musikk",
  startDate: "2026-03-20T18:00:00Z",
  collectedAt: "2026-03-15T12:00:00Z",
  ...overrides,
});

describe("mapEventsToCalendar", () => {
  it("maps all fields for a complete event", () => {
    const events = [
      createEvent({
        endDate: "2026-03-20T20:00:00Z",
        location: "Kulturhuset",
        url: "https://example.com/event",
      }),
    ];

    const result = mapEventsToCalendar(events);

    expect(result).toEqual([
      {
        id: "1",
        title: "Test Event",
        start: "2026-03-20T18:00:00Z",
        end: "2026-03-20T20:00:00Z",
        url: "https://example.com/event",
        extendedProps: {
          category: "musikk",
          location: "Kulturhuset",
          description: "A test event",
        },
      },
    ]);
  });

  it("handles missing optional fields", () => {
    const events = [createEvent()];

    const result = mapEventsToCalendar(events);

    expect(result[0].end).toBeUndefined();
    expect(result[0].url).toBeUndefined();
    expect(result[0].extendedProps?.location).toBeUndefined();
  });

  it("returns an empty array for empty input", () => {
    expect(mapEventsToCalendar([])).toEqual([]);
  });
});
