import { describe, it, expect } from "vitest";
import { mapEventsToCalendar } from "./mapEventsToCalendar";
import { createEvent } from "../test/factories";

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
        title: "Quiz Night",
        start: "2025-06-15T19:00:00Z",
        end: "2026-03-20T20:00:00Z",
        url: "https://example.com/event",
        extendedProps: {
          category: "quiz",
          location: "Kulturhuset",
          description: "Weekly pub quiz",
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
