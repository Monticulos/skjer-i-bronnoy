import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@digdir/designsystemet-css";
import "@digdir/designsystemet-theme";
import "./index.css";
import App from "./App.tsx";
import ListPage from "./pages/ListPage/ListPage.tsx";
import CalendarPage from "./pages/CalendarPage/CalendarPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<ListPage />} />
          <Route path="calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
