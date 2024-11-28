import { renderHook } from '@testing-library/react';
import { useFilterable } from './useFilterable';

interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Jake' },
];

describe('useFilterable', () => {
  it('filters by given value and predicate', () => {
    const filterVal = 'John';
    const filterByName = (item: Item, filter: string) => item.name.includes(filter);

    const { result, rerender } = renderHook(
      ({ dataSource, filter, predicate }) => useFilterable(dataSource, filter, predicate),
      {
        initialProps: {
          dataSource: items,
          filter: filterVal,
          predicate: filterByName,
        },
      },
    );

    // Initial render, filtered data should contain only "John"
    expect(result.current).toEqual([{ id: 1, name: 'John' }]);

    // Update the filter value to "Jane"
    rerender({
      dataSource: items,
      filter: 'Jane',
      predicate: filterByName,
    });

    expect(result.current).toEqual([{ id: 2, name: 'Jane' }]);

    // Update the predicate to filter by id instead of name
    const newPredicate = (item: Item, filter: string) => item.id === parseInt(filter, 10);

    rerender({ dataSource: items, filter: '3', predicate: newPredicate });

    expect(result.current).toEqual([{ id: 3, name: 'Jake' }]);
  });
});
