import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ViewNavigation from "./components/ViewNavigation/ViewNavigation";
import { useEvents } from "./hooks/useEvents";
import type { ViewOutletContext } from "./types/outletContext";
import styles from "./App.module.css";

export default function App() {
  const { events, updatedAt, loading, error } = useEvents();

  const outletContext: ViewOutletContext = { events, loading, error };

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
