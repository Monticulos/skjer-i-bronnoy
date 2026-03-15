import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useEvents } from "./useEvents";
import type { EventsData } from "../types/event";

const MOCK_EVENTS_DATA: EventsData = {
  updatedAt: "2025-06-15T12:00:00Z",
  events: [
    {
      id: "1",
      title: "Test Event",
      description: "A test event",
      category: "musikk",
      startDate: "2025-06-20T18:00:00Z",
      collectedAt: "2025-06-01T00:00:00Z",
    },
  ],
};

describe("useEvents", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and returns events on success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(MOCK_EVENTS_DATA),
    } as Response);

    const { result } = renderHook(() => useEvents());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.events).toEqual(MOCK_EVENTS_DATA.events);
    expect(result.current.updatedAt).toBe(MOCK_EVENTS_DATA.updatedAt);
    expect(result.current.error).toBeNull();
  });

  it("sets error on HTTP failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const { result } = renderHook(() => useEvents());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("HTTP 500");
    expect(result.current.events).toEqual([]);
  });

  it("sets error on network failure", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useEvents());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.events).toEqual([]);
  });
});
