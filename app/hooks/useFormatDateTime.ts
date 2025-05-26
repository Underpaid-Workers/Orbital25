import { Moment } from "moment";

export default function useFormatDateTime(dateTime: Moment): string {
  return dateTime.format("DD/MM/YYYY, h:mm a");
}
