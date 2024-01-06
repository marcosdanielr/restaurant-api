function calculateMinutesDifference(start_time: string, end_time: string) {
  const [startHour, startMinute] = start_time.split(":").map(Number);
  const [endHour, endMinute] = end_time.split(":").map(Number);

  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;

  return totalEndMinutes - totalStartMinutes;
}

export function isMinimumIntervalFifteenMinutes(start_time: string, end_time: string) {
  const MINIMUM_INTERVAL = 15;
  const minutesDifference = calculateMinutesDifference(start_time, end_time);

  return minutesDifference >= MINIMUM_INTERVAL;
}
