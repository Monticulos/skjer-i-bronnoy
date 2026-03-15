import type { RouteObject } from "react-router-dom";
import App from "./App";
import ListPage from "./pages/ListPage/ListPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";

export const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      { index: true, element: <ListPage /> },
      { path: "calendar", element: <CalendarPage /> },
    ],
  },
];
