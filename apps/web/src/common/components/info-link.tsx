import Link, { type LinkProps } from '@cloudscape-design/components/link';

type InfoLinkProps = {
  ariaLabel?: string;
  onFollow: LinkProps['onFollow'];
};
export const InfoLink = ({ ...props }: InfoLinkProps) => (
  <Link variant='info' {...props} />
);
