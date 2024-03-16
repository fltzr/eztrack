import { useEffect, useState } from 'react';
import type { PropertyFilterOperatorFormProps } from '@cloudscape-design/collection-hooks';
import { DateTime, IANAZone } from 'luxon';
import Calendar from '@cloudscape-design/components/calendar';
import DateInput from '@cloudscape-design/components/date-input';
import FormField from '@cloudscape-design/components/form-field';
import TimeInput from '@cloudscape-design/components/time-input';

export const isValidIsoDate = (isoDate: string) => DateTime.fromISO(isoDate).isValid;

export const parseDateTimeFilter = (filter: string) => {
  // Using luxon to parse and validate the date and time
  const luxonDate = DateTime.fromISO(filter);

  if (!luxonDate.isValid) {
    return { dateValue: '', timeValue: '' };
  }

  const dateValue = luxonDate.toISODate();
  const timeValue = luxonDate.toISOTime({ includeOffset: false });

  return { dateValue, timeValue };
};

const parseFilterToDateTime = (filter: string | undefined, operator: string): DateTimeState => {
  if (!filter) {
    return { date: '', time: '' };
  }

  const defaultTime = operator === '<' || operator === '>=' ? '00:00:00' : '23:59:59';
  const luxonDate = DateTime.fromISO(filter);
  const date = luxonDate.toISODate() || undefined;
  const time = luxonDate.toFormat('HH:mm:ss') || defaultTime;

  return { date, time };
};

const toISODateTime = ({ date, time }: { date?: string; time: string }): string | null => {
  if (!date) {
    return null;
  }

  const dateTime = DateTime.fromISO(`${date}T${time}`);

  return dateTime.isValid ? dateTime.toISO() : null;
};

export const formatDateTime = ({
  isoDate,
  timeZone = IANAZone.create('local').name,
}: {
  isoDate: string;
  timeZone: string;
}) => (isoDate ? DateTime.fromISO(isoDate).setZone(timeZone).toString() : '');

type DateTimeState = { date?: string; time: string };
type DateTimeFormProps = PropertyFilterOperatorFormProps<string>;

export const DateTimeForm = ({ filter, operator, onChange }: DateTimeFormProps) => {
  const [dateTime, setDateTime] = useState<DateTimeState>({
    date: '',
    time: '',
  });

  useEffect(() => {
    setDateTime(parseFilterToDateTime(filter, operator));
  }, [filter, operator]);

  useEffect(() => {
    const isoDate = toISODateTime({ date: dateTime.date, time: dateTime.time });

    onChange(isoDate);
  }, [dateTime, onChange]);

  return (
    <div className='date-time-form'>
      <FormField description='Date' constraintText='Use YYYY/MM/DD format.'>
        <DateInput
          placeholder='YYYY/MM/DD'
          value={dateTime.date ?? ''}
          onChange={(e) => {
            setDateTime((prev) => ({ ...prev, date: e.detail.value }));
          }}
        />
      </FormField>

      <FormField description='Time' constraintText='Use 24-hour format.'>
        <TimeInput
          format='hh:mm:ss'
          placeholder='HH:mm:ss'
          value={dateTime.time}
          onChange={(e) => {
            setDateTime((prev) => ({ ...prev, time: e.detail.value }));
          }}
        />
      </FormField>

      <Calendar
        value={dateTime.date ?? ''}
        locale='en-EN'
        onChange={(e) => {
          setDateTime((prev) => ({ ...prev, date: e.detail.value }));
        }}
      />
    </div>
  );
};
