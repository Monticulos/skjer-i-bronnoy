import { NavLink } from "react-router-dom";
import { TasklistIcon, CalendarIcon } from "@navikt/aksel-icons";
import styles from "./ViewNavigation.module.css";

const NAV_LINKS = [
  { to: "/", label: "Liste", icon: TasklistIcon },
  { to: "/calendar", label: "Kalender", icon: CalendarIcon },
] as const;

export default function ViewNavigation() {
  return (
    <nav className={styles.nav} aria-label="Visningstype">
      <ul className={styles.list}>
        {NAV_LINKS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              <Icon aria-hidden fontSize="1.25em" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
