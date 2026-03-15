import type { Event } from "./event";

export interface ViewOutletContext {
  events: Event[];
  loading: boolean;
  error: string | null;
}
