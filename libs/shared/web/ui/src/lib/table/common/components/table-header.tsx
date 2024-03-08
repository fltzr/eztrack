import type { ReactNode } from 'react';
import Box from '@cloudscape-design/components/box';
import Button, { type ButtonProps } from '@cloudscape-design/components/button';
import Header, { type HeaderProps } from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { InfoLink } from '../../../info-link';

type Action = {
  label: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  disabled?: boolean;
};

export type FullPageHeaderProps = HeaderProps & {
  title: string;
  selectedItemsCount: number;
  createButtonText?: string;
  actionButtons?: Action[];
  extraActions?: ReactNode;
  onInfoLinkClick?: () => void;
};
export const FullPageHeader = ({
  title,
  actionButtons,
  extraActions,
  onInfoLinkClick,
  ...props
}: FullPageHeaderProps) => (
  <Box margin={{ top: 'm', bottom: 'xs' }}>
    <Header
      {...props}
      variant="awsui-h1-sticky"
      info={onInfoLinkClick && <InfoLink onFollow={onInfoLinkClick} />}
      actions={
        <SpaceBetween size="xs" direction="horizontal">
          {extraActions}
          {actionButtons?.map((action) => (
            <Button
              key={action.label}
              data-test-id={`header-btn-${action.label.toLowerCase()}`}
              variant={action.variant ?? 'normal'}
              disabled={action.disabled}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </SpaceBetween>
      }
    >
      {title}
    </Header>
  </Box>
);
