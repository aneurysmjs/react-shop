import { useMemo } from 'react';

export const useFilterable = <T>(
  dataSource: T[],
  filterVal: string,
  predicate: (item: T, filter: string) => boolean,
) => {
  const filteredData = useMemo(() => {
    return dataSource.filter((item) => predicate(item, filterVal));
  }, [dataSource, predicate, filterVal]);

  return filteredData;
};

export default useFilterable;
