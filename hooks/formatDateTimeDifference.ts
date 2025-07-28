import moment from "moment";

/**
 * @description A function that takes in a moment().format() start and end time and returns the difference in minutes
 * @param startTime as string
 * @param endTime as string
 * @returns Time difference in minutes as number
 */
export default function formatDateTimeDifference(
  startTime: string,
  endTime: string
): number {
  const start = moment(startTime, moment.ISO_8601);
  const end = moment(endTime, moment.ISO_8601);
  return Math.round(moment.duration(end.diff(start)).asMinutes());
}
