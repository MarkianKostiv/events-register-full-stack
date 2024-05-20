import { Event } from "../interfaces/Event";
export const sortEvents = (
  array: Event[],
  parsDateFunc: (dateString: string) => Date,
  setFunc: (events: Event[]) => void,
  value: string
) => {
  if (value === "title") {
    const sortedList = [...array].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setFunc(sortedList);
  } else if (value === "eventDate") {
    const sortedList = [...array].sort(
      (a, b) =>
        parsDateFunc(a.eventDate).getTime() -
        parsDateFunc(b.eventDate).getTime()
    );
    setFunc(sortedList);
  } else if (value === "organizer") {
    const sortedList = [...array].sort((a, b) =>
      a.organizer.localeCompare(b.organizer)
    );
    setFunc(sortedList);
  }
};
