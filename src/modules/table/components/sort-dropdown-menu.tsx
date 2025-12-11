"use client";

import {
  Table,
  Column,
  type SortDirection,
  type RowData,
} from "@tanstack/react-table";
import { ArrowUpDownIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SortDropdownMenuProps<TData extends RowData> {
  table: Table<TData>;
}

export function SortDropdownMenu<TData extends RowData>({
  table,
}: SortDropdownMenuProps<TData>) {
  // 获取所有可排序且可见的列，并按照 columnOrder 排序
  const getSortableColumns = (): Column<TData>[] => {
    const allColumns = table.getAllColumns();
    const columnOrder = table.getState().columnOrder;

    // 如果有设置列顺序，则按照顺序排列
    if (columnOrder.length > 0) {
      const columnMap = new Map(
        allColumns.map((column) => [column.id, column])
      );

      return columnOrder
        .map((columnId) => columnMap.get(columnId))
        .filter(
          (column): column is Column<TData> =>
            column !== undefined && column.getCanSort() && column.getIsVisible()
        );
    }

    // 否则使用默认顺序
    return allColumns.filter(
      (column) => column.getCanSort() && column.getIsVisible()
    );
  };

  // 根据列的 meta 获取排序标签
  const getSortLabels = (columnId: string) => {
    const column = table.getColumn(columnId);

    // 优先使用列定义中的 sortLabels
    if (column?.columnDef.meta?.sortLabels) {
      return column.columnDef.meta.sortLabels;
    }

    // 默认标签
    return { asc: "升序", desc: "降序" };
  };

  const sortableColumns: Column<TData>[] = getSortableColumns();
  const currentSortedColumn = table.getState().sorting?.[0];

  // 选中的列
  const [selectedColumnId, setSelectedColumnId] = useState<string>(
    currentSortedColumn?.id || sortableColumns[0]?.id || ""
  );

  // 排序方向
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    currentSortedColumn?.desc === false ? "asc" : "desc"
  );

  // 获取当前选中列的标签
  const currentLabels = getSortLabels(selectedColumnId);

  const handleSort = (direction: SortDirection) => {
    setSortDirection(direction);
    const column = table.getColumn(selectedColumnId);
    if (column) {
      column.toggleSorting(direction === "desc");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="size-7">
          <ArrowUpDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuLabel>排序依据</DropdownMenuLabel>

        {sortableColumns.length === 0 ? (
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            没有可排序的列
          </div>
        ) : (
          <>
            <div className="p-2">
              <RadioGroup
                value={selectedColumnId}
                onValueChange={setSelectedColumnId}
              >
                {sortableColumns.map((column) => {
                  const columnHeader =
                    typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id;

                  return (
                    <div
                      key={column.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={column.id} id={column.id} />
                      <Label
                        htmlFor={column.id}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {columnHeader}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => handleSort("asc")}
              className={cn(sortDirection === "asc" && "bg-accent")}
            >
              <ArrowUpIcon className="mr-2 size-4" />
              {currentLabels.asc}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSort("desc")}
              className={cn(sortDirection === "desc" && "bg-accent", "mt-1")}
            >
              <ArrowDownIcon className="mr-2 size-4" />
              {currentLabels.desc}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
