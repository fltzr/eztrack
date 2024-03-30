import Pagination from '@cloudscape-design/components/pagination';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Table from '@cloudscape-design/components/table';
import { capitalize, isEmpty } from 'lodash-es';
import { useCallback, useMemo, useState } from 'react';

import { FullPageHeader, type FullPageHeaderProps } from './common/components/table-header';
import { ManualRefresh } from './common/components/table-manual-refresh-button';
import { Preferences } from './common/components/table-preferences';
import { useTableState } from './common/hooks/use-table-state';
import type { ReusableTableProps } from './common/table-props';
import { getHeaderCounterText, getTextFilterCounterText } from './common/utils/table-utils';

export const ReusableTable = <T extends { id: string }>({
  selectedItems = [],
  setSelectedItems,
  localstorageKeyPrefix,
  resource,
  loading,
  loadingText,
  disableFilter = false,
  ...props
}: ReusableTableProps<T>) => {
  const [refreshedAt, setRefreshedAt] = useState<Date | null>(null);

  const tableState = useTableState<T>({
    localstorageKeyPrefix,
    resource,
    ...props,
  });

  const onRefreshClickSideEffect = useCallback(() => {
    props.onRefreshClick?.();
    setRefreshedAt(new Date());
  }, [props]);

  const actionButtons = useMemo(
    () =>
      [
        props.onViewClick && {
          label: 'View',
          onClick: () => props.onViewClick?.(selectedItems[0].id),
          disabled: selectedItems.length !== 1,
        },
        props.onEditClick && {
          label: 'Edit',
          onClick: () => props.onEditClick?.(selectedItems[0].id),
          disabled: selectedItems.length !== 1,
        },
        props.onDeleteClick && {
          label: 'Delete',
          onClick: () => props.onDeleteClick?.(selectedItems.map((i) => i.id)),
          disabled: isEmpty(selectedItems),
        },
        props.onCreateClick && {
          label: 'Create',
          onClick: () => props.onCreateClick?.(),
          variant: 'primary',
        },
        props.onMiscClick && {
          label: props.miscButtonLabel,
          onClick: () => props.onMiscClick?.(selectedItems[0].id),
          disabled: selectedItems.length !== 1,
          variant: 'primary',
        },
      ].filter(Boolean) as FullPageHeaderProps['actionButtons'],
    [props, selectedItems],
  );

  const preferencesProps = useMemo(
    () => ({
      resource,
      items: tableState.columnDefinitions,
      preferences: tableState.preferences,
    }),
    [resource, tableState],
  );

  return (
    <Table
      {...tableState.collectionProps}
      resizableColumns
      variant={props.variant}
      stickyHeader={props.stickyHeader}
      columnDefinitions={tableState.columnDefinitions}
      items={tableState.items}
      selectionType={props.selectionType}
      selectedItems={selectedItems}
      loading={loading}
      loadingText={loadingText}
      columnDisplay={tableState.preferences.contentDisplay}
      wrapLines={tableState.preferences.wrapLines}
      stripedRows={tableState.preferences.stripedRows}
      contentDensity={tableState.preferences.contentDensity}
      stickyColumns={tableState.preferences.stickyColumns}
      pagination={<Pagination {...tableState.paginationProps} />}
      submitEdit={props.onSubmitEdit}
      header={
        <FullPageHeader
          title={`${capitalize(resource)}s`}
          selectedItemsCount={selectedItems.length}
          actionButtons={actionButtons}
          counter={getHeaderCounterText({
            items: tableState.items,
            selectedItems,
            totalItems: props.items.length,
          })}
          extraActions={
            props.onRefreshClick && (
              <ManualRefresh
                loading={loading ?? false}
                lastRefresh={refreshedAt}
                onRefresh={onRefreshClickSideEffect}
              />
            )
          }
        />
      }
      filter={
        disableFilter ? undefined : (
          <PropertyFilter
            {...tableState.propertyFilterProps}
            expandToViewport
            filteringAriaLabel={`Filter ${resource.toLowerCase()}s`}
            filteringPlaceholder={`Filter ${resource.toLowerCase()}s`}
            countText={getTextFilterCounterText({
              count: tableState.filteredItemsCount,
            })}
          />
        )
      }
      preferences={
        <Preferences
          {...preferencesProps}
          setPreferences={(event) => {
            tableState.setPreferences(event.detail);
          }}
        />
      }
      onSelectionChange={({ detail }) => {
        setSelectedItems(detail.selectedItems);
      }}
      onColumnWidthsChange={(event) => {
        tableState.saveWidths(event);
      }}
    />
  );
};
