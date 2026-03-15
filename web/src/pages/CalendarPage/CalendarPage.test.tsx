import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import type { ViewOutletContext } from "../../types/outletContext";
import CalendarPage from "./CalendarPage";

function renderCalendarPage(context: ViewOutletContext) {
  function Wrapper() {
    return <Outlet context={context} />;
  }

  return render(
    <MemoryRouter initialEntries={["/calendar"]}>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("CalendarPage", () => {
  it("shows a spinner while loading", () => {
    renderCalendarPage({ events: [], loading: true, error: null });

    expect(screen.getByLabelText("Laster kalender")).toBeInTheDocument();
  });

  it("shows an error message on failure", () => {
    renderCalendarPage({ events: [], loading: false, error: "Server error" });

    expect(screen.getByText(/Kunne ikke laste data/)).toBeInTheDocument();
    expect(screen.getByText(/Server error/)).toBeInTheDocument();
  });

  it("renders the calendar when events are loaded", () => {
    renderCalendarPage({ events: [], loading: false, error: null });

    expect(screen.queryByLabelText("Laster kalender")).not.toBeInTheDocument();
    expect(screen.queryByText(/Kunne ikke laste data/)).not.toBeInTheDocument();
  });
});
