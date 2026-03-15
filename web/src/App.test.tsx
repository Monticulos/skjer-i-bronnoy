import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ListPage from "./pages/ListPage/ListPage";
import type { EventsData } from "./types/event";

const MOCK_EVENTS_DATA: EventsData = {
  updatedAt: "2025-06-15T12:00:00Z",
  events: [
    {
      id: "1",
      title: "Mock Event",
      description: "A mock event",
      category: "annet",
      startDate: "2099-06-20T18:00:00Z",
      collectedAt: "2025-06-01T00:00:00Z",
    },
  ],
};

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches events.json on mount and renders events", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(MOCK_EVENTS_DATA),
    } as Response);

    render(
      <MemoryRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<ListPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Mock Event")).toBeInTheDocument();
    });
  });

  it("shows error when fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Failed to fetch"));

    render(
      <MemoryRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<ListPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Kunne ikke laste data/)).toBeInTheDocument();
    });
  });
});
