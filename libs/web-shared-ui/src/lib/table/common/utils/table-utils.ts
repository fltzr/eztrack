import { isEmpty } from 'lodash-es';

export const getTextFilterCounterText = ({ count }: { count?: number }) =>
  `${count ?? 0} ${count === 1 ? 'match' : 'matches'}`;

type GetHeaderCounterTextParams = {
  items: readonly unknown[];
  selectedItems?: readonly unknown[];
  totalItems: number;
};
export const getHeaderCounterText = ({
  selectedItems,
  totalItems,
}: GetHeaderCounterTextParams) =>
  selectedItems && !isEmpty(selectedItems)
    ? `(${selectedItems.length}/${totalItems})`
    : `(${totalItems})`;
