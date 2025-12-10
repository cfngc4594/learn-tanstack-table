import { flexRender, Header } from "@tanstack/react-table";
import { TableHead } from "@/components/ui/table";
import { Person } from "./types";

type TableHeaderCellProps = {
  header: Header<Person, unknown>;
};

/**
 * 表格头部单元格组件
 * 支持点击排序功能
 */
export const TableHeaderCell = ({ header }: TableHeaderCellProps) => {
  const sortDirection = header.column.getIsSorted();
  const sortIcon = sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "";

  return (
    <TableHead
      onClick={header.column.getToggleSortingHandler()}
      className="cursor-pointer select-none"
    >
      <div className="flex items-center gap-1">
        {flexRender(header.column.columnDef.header, header.getContext())}
        {sortIcon && (
          <span className="text-muted-foreground">{sortIcon}</span>
        )}
      </div>
    </TableHead>
  );
};
