import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

type ManualRefreshProps = {
  onRefresh: () => void;
  loading: boolean;
  lastRefresh: Date | null;
  disabled?: boolean;
};

export const ManualRefresh = ({
  onRefresh,
  loading,
  lastRefresh,
  disabled,
}: ManualRefreshProps) => (
  <SpaceBetween
    data-testid='manual-refresh'
    direction='horizontal'
    size='xs'
    alignItems='center'>
    {lastRefresh && (
      <Box
        variant='p'
        fontSize='body-s'
        padding='n'
        color='text-status-inactive'
        textAlign='right'>
        <span aria-live='polite' aria-atomic='true'>
          Last updated
          <br />
          {lastRefresh.toLocaleString()}
        </span>
      </Box>
    )}
    <Button
      iconName='refresh'
      ariaLabel='Refresh'
      loadingText='Refreshing table content'
      loading={loading}
      disabled={disabled}
      onClick={onRefresh}
    />
  </SpaceBetween>
);
