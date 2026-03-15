import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ViewNavigation from "./components/ViewNavigation/ViewNavigation";
import eventsData from "../public/data/events.json";
import type { EventsData } from "./types/event";
import type { ViewOutletContext } from "./types/outletContext";
import styles from "./App.module.css";

export default function App() {
  const { events, updatedAt } = eventsData as EventsData;
  const outletContext: ViewOutletContext = { events };

  return (
    <>
      <Header />
      <ViewNavigation />
      <main className={styles.main}>
        <Outlet context={outletContext} />
      </main>
      <Footer updatedAt={updatedAt} />
    </>
  );
}
