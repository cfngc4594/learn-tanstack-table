import { useMemo } from "react";
import { Person } from "./types";
import { GroupByKey } from "./group-by-selector";
import { matchesSearch } from "./config/search-fields";

type UseTableDataParams = {
  data: Person[];
  globalFilter: string;
  groupBy: GroupByKey;
};

/**
 * 表格数据处理 Hook
 * 负责数据过滤和分组逻辑
 */
export const useTableData = ({
  data,
  globalFilter,
  groupBy,
}: UseTableDataParams) => {
  // 根据全局搜索过滤数据
  const filteredData = useMemo(() => {
    if (!globalFilter) return data;

    const searchValue = globalFilter.toLowerCase();
    return data.filter((person) => matchesSearch(person, searchValue));
  }, [data, globalFilter]);

  // 按选定字段分组数据
  const groupedData = useMemo(() => {
    if (groupBy === "none") {
      return { all: filteredData };
    }

    const groups: Record<string, Person[]> = {};

    filteredData.forEach((person) => {
      const groupKey = String(person[groupBy]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(person);
    });

    return groups;
  }, [filteredData, groupBy]);

  return {
    filteredData,
    groupedData,
  };
};
