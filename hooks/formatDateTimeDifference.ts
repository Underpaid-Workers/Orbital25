import moment from "moment";

export default function formatDateTimeDifference(
  startTime: string,
  endTime: string
): number {
  const start = moment(startTime, moment.ISO_8601);
  const end = moment(endTime, moment.ISO_8601);
  return Math.round(moment.duration(end.diff(start)).asMinutes());
}
