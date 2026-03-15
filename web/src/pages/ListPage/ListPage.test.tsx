import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import type { ViewOutletContext } from "../../types/outletContext";
import { createEvent } from "../../test/factories";
import ListPage from "./ListPage";

function renderListPage(context: ViewOutletContext) {
  function Wrapper() {
    return <Outlet context={context} />;
  }

  return render(
    <MemoryRouter>
      <Routes>
        <Route element={<Wrapper />}>
          <Route index element={<ListPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("ListPage", () => {
  it("shows a spinner while loading", () => {
    renderListPage({ events: [], loading: true, error: null });

    expect(screen.getByLabelText("Laster arrangementer")).toBeInTheDocument();
  });

  it("shows an error message on failure", () => {
    renderListPage({ events: [], loading: false, error: "Network error" });

    expect(screen.getByText(/Kunne ikke laste data/)).toBeInTheDocument();
  });

  it("renders events when loaded", async () => {
    const futureEvent = createEvent({
      title: "Future Event",
      startDate: "2099-06-20T18:00:00Z",
    });

    renderListPage({ events: [futureEvent], loading: false, error: null });

    await waitFor(() => {
      expect(screen.getByText("Future Event")).toBeInTheDocument();
    });
  });
});
