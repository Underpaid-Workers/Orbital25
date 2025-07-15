import { useAuthContext } from "@/providers/AuthProvider";
import fetchEvents from "@/supabase/event_hooks/fetchEvents";
import { Event } from "@/supabase/schema";
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
  currentTime: string;
  eventsLoading: boolean;
  getEvents: () => void;
  updateUserEventBadges: () => void;
};

const EventContext = createContext<EventData>({
  events: [],
  currentTime: "placeholder",
  eventsLoading: true,
  getEvents: () => {},
  updateUserEventBadges: () => {},
});

export default function EventsProvider({ children }: PropsWithChildren) {
  const { session } = useAuthContext();
  const [events, setEvents] = useState<Event[]>([]);
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
      console.log(currentTime);
      fetchEvents(currentTime)
        .then((response) => {
          if (response.success) {
            console.log(`${response.data.length} events fetched`);
            setEvents(response.data);
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

  return (
    <EventContext.Provider
      value={{
        events,
        currentTime,
        eventsLoading,
        getEvents,
        updateUserEventBadges,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export const useEventsContext = () => useContext(EventContext);
