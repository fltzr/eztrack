import { ReusableTable } from '@/web/ui';
import { ReusableTableEventHandlers } from '@/web/ui';
import { courtreserveEventDefinition, type CourtreserveEvent } from './config';

type CourtreserveEventTableProps = {
  loading: boolean;
  events: CourtreserveEvent[];
  selectedItems: CourtreserveEvent[];
} & ReusableTableEventHandlers<CourtreserveEvent>;

export const CourtreserveEventTable = ({
  loading,
  events,
  selectedItems,
  ...clickHandlers
}: CourtreserveEventTableProps) => (
  <ReusableTable<CourtreserveEvent>
    stickyHeader
    variant="borderless"
    localstorageKeyPrefix="Courtreserve-Events"
    resource="event"
    columnDefinitions={courtreserveEventDefinition}
    items={events}
    selectedItems={selectedItems}
    loading={loading}
    loadingText="Loading resources..."
    selectionType="multi"
    {...clickHandlers}
  />
);
