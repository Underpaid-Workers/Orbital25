import { Badge } from "@/supabase/schema";

export default function sortBadges(badges: Badge[]): Badge[] {
  const ownedProg: Badge[] = [];
  const ownedEvent: Badge[] = [];
  const unownedProg: Badge[] = [];
  const unownedEvent: Badge[] = [];

  for (const b of badges) {
    const isOwned = b.earned_at !== null;
    if (isOwned) {
      if (b.badge_type === "progression") ownedProg.push(b);
      else ownedEvent.push(b);
    } else {
      if (b.badge_type === "progression") unownedProg.push(b);
      else unownedEvent.push(b);
    }
  }

  const compareByName = (a: Badge, b: Badge) => a.name.localeCompare(b.name);
  ownedProg.sort(compareByName);
  ownedEvent.sort(compareByName);
  unownedProg.sort(compareByName);
  unownedEvent.sort(compareByName);

  return [...ownedProg, ...ownedEvent, ...unownedProg, ...unownedEvent];
}
