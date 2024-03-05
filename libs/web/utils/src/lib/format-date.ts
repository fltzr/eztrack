import { DateTime } from 'luxon';

export const formatISODate = (isoDateTime: string) => {
  const now = DateTime.now();
  const targetDate = DateTime.fromISO(isoDateTime);

  const isFuture = targetDate > now;

  const diff = isFuture
    ? targetDate.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject()
    : now.diff(targetDate, ['days', 'hours', 'minutes', 'seconds']).toObject();

  const days = diff.days ?? 0;

  const hours = diff.hours ?? 0;

  const minutes = diff.minutes ?? 0;

  const seconds = diff.seconds ? Math.floor(diff.seconds) : 0;

  if (days > 1) {
    return `${days} days ${hours} hours`;
  }

  if (days === 1) {
    return `${days} day ${hours}`;
  }

  if (hours > 1) {
    return `${hours} hours ${minutes} minutes`;
  }

  if (hours === 1) {
    return `${hours} hour ${minutes} minutes`;
  }

  if (hours === 0 && minutes > 0) {
    return `${minutes} minutes ${seconds} seconds`;
  }

  return `${seconds} seconds`;
};
