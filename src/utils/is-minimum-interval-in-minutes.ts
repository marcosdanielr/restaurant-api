export function isMinimumIntervalInMinutes(start_time: string, end_time: string, minimum_interval: number) {

  const startDate = new Date(0, 0, 0, ...start_time.split(":").map(Number));
  const endDate = new Date(0, 0, 0, ...end_time.split(":").map(Number));

  const minutesDifference = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60));

  return minutesDifference >= minimum_interval;
}
