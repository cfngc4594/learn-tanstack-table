import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../types";
import { useBasicTable } from "../hooks/use-basic-table";
import { TableContent } from "./table-content";

type SimpleTableProps = {
  data: Person[];
  columns: ColumnDef<Person>[];
};

/**
 * 简单表格组件（不分组）
 */
export const SimpleTable = ({ data, columns }: SimpleTableProps) => {
  const table = useBasicTable({ data, columns });

  return <TableContent table={table} />;
};
