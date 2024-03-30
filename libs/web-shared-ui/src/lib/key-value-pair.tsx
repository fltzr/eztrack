import Box from '@cloudscape-design/components/box';
import type { PropsWithChildren } from 'react';

type KeyValuePairProps = {
  label: string;
} & PropsWithChildren;

export const KeyValuePair = ({ label, children }: KeyValuePairProps) => (
  <div>
    <Box variant="awsui-key-label">{label}</Box>
    <div>{children}</div>
  </div>
);
