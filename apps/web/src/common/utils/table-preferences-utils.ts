import { DateTime } from 'luxon';

export const isValidIsoDate = (date: string) => DateTime.fromISO(date).isValid;

type ParseValueParams = { value: string; defaultTime: string };
export const parseValue = ({ value, defaultTime = '' }: ParseValueParams) => {
  const dateTime = DateTime.fromISO(value);

  const dateValue = dateTime.toISODate() || '';
  const timeValue =
    dateTime.toISOTime() ? dateTime.toFormat('HH:mm') : defaultTime;

  return { date: dateValue, time: timeValue };
};

export const parseDateTimeFilter = (filter: string) => {
  const dateTime = DateTime.fromISO(filter);

  if (!dateTime.isValid) {
    return { date: '', time: '' };
  }

  const date = dateTime.toFormat('yyyy-MM-dd');
  const time = dateTime.toFormat('HH:mm');

  return { date, time };
};
