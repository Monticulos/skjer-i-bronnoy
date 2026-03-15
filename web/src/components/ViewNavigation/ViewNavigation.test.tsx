import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ViewNavigation from "./ViewNavigation";

function renderWithRouter(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ViewNavigation />
    </MemoryRouter>
  );
}

describe("ViewNavigation", () => {
  it("renders both navigation links", () => {
    renderWithRouter();

    expect(screen.getByRole("link", { name: /liste/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /kalender/i })
    ).toBeInTheDocument();
  });

  it("marks Liste as active on the root route", () => {
    renderWithRouter("/");

    const listeLink = screen.getByRole("link", { name: /liste/i });
    const kalenderLink = screen.getByRole("link", { name: /kalender/i });

    expect(listeLink.className).toMatch(/active/);
    expect(kalenderLink.className).not.toMatch(/active/);
  });

  it("marks Kalender as active on the /calendar route", () => {
    renderWithRouter("/calendar");

    const listeLink = screen.getByRole("link", { name: /liste/i });
    const kalenderLink = screen.getByRole("link", { name: /kalender/i });

    expect(kalenderLink.className).toMatch(/active/);
    expect(listeLink.className).not.toMatch(/active/);
  });
});
