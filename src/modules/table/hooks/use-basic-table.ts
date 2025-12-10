import { useReactTable, getCoreRowModel, getSortedRowModel, ColumnDef } from "@tanstack/react-table";
import { Person } from "../types";

type UseBasicTableParams = {
  data: Person[];
  columns: ColumnDef<Person>[];
};

/**
 * 基础表格 hook，封装通用的表格配置
 */
export const useBasicTable = ({ data, columns }: UseBasicTableParams) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
};
