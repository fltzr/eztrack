import { useState, useEffect } from 'react';
import Box from '@cloudscape-design/components/box';
import { formatISODate } from '@/web/utils';

export const Countdown = ({ isoDateTime }: { isoDateTime: string }) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    const updateLabel = () => {
      setLabel(formatISODate(isoDateTime));
    };

    updateLabel();

    const interval = setInterval(updateLabel, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isoDateTime]);

  return <Box variant="span">{label}</Box>;
};
