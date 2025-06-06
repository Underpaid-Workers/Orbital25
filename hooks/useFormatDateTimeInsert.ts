import moment from "moment";

/**
 * @description Parses string of "DD/MM/YYYY, h:mm a" into ISO8601 "YYYY-MM-DDTHH:MM:SS.sssZ"
 * @param "DD/MM/YYYY, h:mm a" as string
 * @returns "YYYY-MM-DDTHH:MM:SS.sssZ" as string
 */
export default function useFormatDateTimeInsert(dateTime: string): string {
  return moment(dateTime, "DD,MM,YYYY,h:mm A").toISOString(true);
}
