import formatEventCriteria from "@/hooks/formatEventCriteria";
import { useAuthContext } from "@/providers/AuthProvider";
import fetchEvents from "@/supabase/event_hooks/fetchEvents";
import updateUserEventProgress from "@/supabase/event_hooks/updateUserEventProgress";
import {
  Event,
  EventDatabase,
  UserEventProgressUpdate,
} from "@/supabase/schema";
import moment from "moment";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

type EventData = {
  events: Event[];
  rawEvents: EventDatabase[];
  currentTime: string;
  eventsLoading: boolean;
  getEvents: () => void;
  updateUserEventBadges: () => void;
  updateUserEventProgression: (updated: UserEventProgressUpdate[]) => void;
};

const EventContext = createContext<EventData>({
  events: [],
  rawEvents: [],
  currentTime: "placeholder",
  eventsLoading: true,
  getEvents: () => {},
  updateUserEventBadges: () => {},
  updateUserEventProgression: () => {},
});

export default function EventsProvider({ children }: PropsWithChildren) {
  const { session } = useAuthContext();
  const [events, setEvents] = useState<Event[]>([]);
  const [rawEvents, setRawEvents] = useState<EventDatabase[]>([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>(moment().format());

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(moment().format());
    }, 5000);
  }, []);

  const getEvents = () => {
    setEventsLoading(true);
    if (session) {
      fetchEvents(session.user.id, currentTime)
        .then((response) => {
          if (response.success) {
            console.log(`${response.data.length} events fetched`);
            const eventsData = response.data as EventDatabase[];
            const events = eventsData.map(
              ({ criteria, progress, ...event }) => {
                const formattedProgress = formatEventCriteria(
                  criteria,
                  progress
                );
                return {
                  ...event,
                  current: formattedProgress.current,
                  total: formattedProgress.total,
                } as Event;
              }
            );
            setRawEvents(eventsData);
            setEvents(events);
          } else {
            console.error(response.message);
            Alert.alert("Username Error", response.message);
          }
        })
        .finally(() => setEventsLoading(false));
    } else {
      console.error("No session detected");
      setEventsLoading(false);
    }
  };

  const updateUserEventBadges = () => {};

  const updateUserEventProgression = (updated: UserEventProgressUpdate[]) => {
    setEventsLoading(true);
    if (session) {
      updateUserEventProgress(updated)
        .then((response) => {
          if (response.success) {
            console.log(`${response.data} event progression updated`);
            getEvents();
          } else {
            console.error(response.message);
            Alert.alert("Event Error", response.message);
          }
        })
        .finally(() => setEventsLoading(false));
    } else {
      console.error("No session detected");
      setEventsLoading(false);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        rawEvents,
        currentTime,
        eventsLoading,
        getEvents,
        updateUserEventBadges,
        updateUserEventProgression,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

/**
 * @description (tabs)-wide context for managing event data
 * @param events the list of events as Event[]
 * @param currentTime the current time updated every 5 seconds as ISO6801 string
 * @param getEvents a function which fetches all events from supabase
 * @param updateUserEventBadges a function which updates user badges based on user's event progress
 * @example const { events, getEvents } = useEventsContext()
 */
export const useEventsContext = () => useContext(EventContext);
