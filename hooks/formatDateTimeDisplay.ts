import moment from "moment";

/**
 * @description Parses string of "YYYY-MM-DDTHH:MM:SS.sssZ" into "DD/MM/YYYY, h:mm a"
 * @param "YYYY-MM-DDTHH:MM:SS.sssZ" as string
 * @returns "DD/MM/YYYY, h:mm a" as string
 */
export default function formatDateTimeDisplay(dateTime: string): string {
  return moment(dateTime, moment.ISO_8601).format("DD/MM/YYYY, h:mm a");
}
