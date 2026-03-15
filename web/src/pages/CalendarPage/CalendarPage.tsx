import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Spinner, Alert } from "@digdir/designsystemet-react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import nbLocale from "@fullcalendar/core/locales/nb";
import type { ViewOutletContext } from "../../types/outletContext";
import { mapEventsToCalendar } from "../../utils/mapEventsToCalendar";
import styles from "./CalendarPage.module.css";

const CALENDAR_PLUGINS = [timeGridPlugin];
const SLOT_MIN_TIME = "06:00:00";
const SLOT_DURATION = "01:00:00";
function formatDayHeader(arg: { date: Date }) {
  const weekday = arg.date.toLocaleDateString("nb-NO", { weekday: "short" });
  const day = arg.date.getDate();
  const month = arg.date.getMonth() + 1;
  return `${weekday} ${day}.${month}`;
}

export default function CalendarPage() {
  const { events, loading, error } = useOutletContext<ViewOutletContext>();
  const calendarEvents = useMemo(() => mapEventsToCalendar(events), [events]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner aria-label="Laster kalender" />
      </div>
    );
  }

  if (error) {
    return <Alert data-color="danger">Kunne ikke laste data. {error}</Alert>;
  }

  return (
    <div className={styles.container}>
      <FullCalendar
        plugins={CALENDAR_PLUGINS}
        initialView="timeGridWeek"
        locale={nbLocale}
        height="auto"
        allDaySlot={false}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        dayHeaderContent={formatDayHeader}
        slotMinTime={SLOT_MIN_TIME}
        slotDuration={SLOT_DURATION}
        events={calendarEvents}
      />
    </div>
  );
}
