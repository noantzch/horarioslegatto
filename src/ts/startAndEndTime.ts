export function getEarliestStartTime(schedule: OutputEvent[]): string {
  let earliestStartTime: Date | null = null;

  for (const clase of schedule) {
      const startTime = new Date(`1970-01-01T${clase.startTime}`);
      if (!earliestStartTime || startTime < earliestStartTime) {
          earliestStartTime = startTime;
      }
  }

  return earliestStartTime?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) || '09:00';
}

export function getLatestEndTime(schedule: OutputEvent[]): string {
  let latestEndTime: Date | null = null;

  for (const clase of schedule) {
      const endTime = new Date(`1970-01-01T${clase.endTime}`);
      if (!latestEndTime || endTime > latestEndTime) {
          latestEndTime = endTime;
      }
  }

  return latestEndTime?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) || '21:00';
}
