"use client";

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableCore } from "./data-table-core";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Columns3Icon,
  ListFilterIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { useColumnVisibility } from "./hooks/use-column-visibility";
import { useColumnOrder } from "./hooks/use-column-order";
import { DraggableColumnItem } from "./components/draggable-column-item";
import { SortDropdownMenu } from "./components/sort-dropdown-menu";
import { getEditableColumnIds, getFixedColumnIds } from "./utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  pageSizeOptions?: number[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [showSearchAndFilter, setShowSearchAndFilter] =
    useState<boolean>(false);
  const [isColumnEditMode, setIsColumnEditMode] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  // 自定义全局过滤函数：只搜索可见的列
  const globalFilterFn: FilterFn<TData> = (row, _columnId, filterValue) => {
    const search = filterValue.toLowerCase();

    // 获取所有可见的列
    const visibleColumns = row.getAllCells().filter((cell) => {
      const column = cell.column;
      return column.getIsVisible();
    });

    // 在可见列中搜索
    return visibleColumns.some((cell) => {
      const cellValue = cell.getValue();
      if (cellValue == null) return false;
      return String(cellValue).toLowerCase().includes(search);
    });
  };

  // 使用自定义 hook 管理列可见性
  const {
    columnVisibility,
    pendingColumnVisibility,
    setColumnVisibility,
    initPendingVisibility,
    applyPendingVisibility,
    resetPendingVisibility,
    togglePendingVisibility,
  } = useColumnVisibility();

  // 使用自定义 hook 管理列顺序
  const {
    columnOrder,
    pendingColumnOrder,
    setColumnOrder,
    setPendingColumnOrder,
    initPendingOrder,
    resetPendingOrder,
  } = useColumnOrder();

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      globalFilter,
      rowSelection,
      columnVisibility,
      columnOrder,
      sorting,
    },
  });

  // 进入列编辑模式
  const enterColumnEditMode = () => {
    initPendingVisibility(table.getState().columnVisibility);
    initPendingOrder(getEditableColumnIds(table));
    setIsColumnEditMode(true);
  };

  // 保存列配置
  const saveColumnChanges = () => {
    applyPendingVisibility();

    // 合并固定列和可编辑列的顺序
    const fixedColumns = getFixedColumnIds(table);
    const mergedColumnOrder = [...fixedColumns, ...pendingColumnOrder];

    // 设置完整的列顺序
    setColumnOrder(mergedColumnOrder);
    setIsColumnEditMode(false);
  };

  // 取消列编辑
  const cancelColumnEditing = () => {
    resetPendingVisibility();
    resetPendingOrder();
    setIsColumnEditMode(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col border rounded-2xl overflow-hidden">
        {!showSearchAndFilter && !isColumnEditMode && (
          <div className="h-11 flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-2">
              <Tabs defaultValue="all">
                <TabsList className="p-0 h-7 bg-transparent">
                  <TabsTrigger
                    value="all"
                    className="px-3 data-[state=active]:bg-muted cursor-pointer"
                  >
                    全部
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                size="icon"
                variant="ghost"
                className="size-7 cursor-pointer"
              >
                <PlusIcon />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-7 w-12 gap-0 cursor-pointer"
                onClick={() => setShowSearchAndFilter(true)}
              >
                <SearchIcon className="m-0.5" />
                <ListFilterIcon className="m-0.5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="size-7 cursor-pointer"
                onClick={enterColumnEditMode}
              >
                <Columns3Icon />
              </Button>
              <SortDropdownMenu table={table} />
            </div>
          </div>
        )}

        {isColumnEditMode && (
          <div className="h-11 flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-2">
              <Tabs defaultValue="all">
                <TabsList className="p-0 h-7 bg-transparent">
                  <TabsTrigger
                    value="all"
                    className="px-3 data-[state=active]:bg-muted"
                    disabled={true}
                  >
                    全部
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                size="icon"
                variant="ghost"
                className="size-7"
                disabled={true}
              >
                <PlusIcon />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="h-6 px-2 py-1 cursor-pointer"
                onClick={cancelColumnEditing}
              >
                <span>取消</span>
              </Button>
              <Button
                variant="secondary"
                className="h-6 px-2 py-1 cursor-pointer"
                onClick={saveColumnChanges}
              >
                保存
              </Button>
            </div>
          </div>
        )}

        {showSearchAndFilter && (
          <>
            <div className="h-11 flex items-center justify-between p-2 border-b gap-4">
              <Input
                placeholder="搜索全部"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="h-8"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="h-6 px-2 py-1 cursor-pointer"
                  onClick={() => {
                    setGlobalFilter("");
                    setShowSearchAndFilter(false);
                  }}
                >
                  <span>取消</span>
                </Button>
                <Button
                  variant="secondary"
                  className="h-6 px-2 py-1 cursor-pointer"
                >
                  另存为
                </Button>
                <SortDropdownMenu table={table} />
              </div>
            </div>
            <div className="h-9 flex items-center px-2 py-1.5 border-b gap-1">
              <Button
                variant="outline"
                className="h-6 has-[>svg]:pl-2 has-[>svg]:pr-1.5 py-0 border-dashed gap-0 text-muted-foreground cursor-pointer"
              >
                <span className="text-xs font-normal">添加筛选条件</span>
                <PlusIcon />
              </Button>
            </div>
          </>
        )}

        {isColumnEditMode && pendingColumnOrder.length > 0 && (
          <Reorder.Group
            axis="x"
            values={pendingColumnOrder}
            onReorder={setPendingColumnOrder}
            className="flex items-center p-2 gap-2 overflow-x-auto"
          >
            {pendingColumnOrder.map((columnId) => {
              const column = table.getColumn(columnId);
              if (!column) return null;

              const isVisible = pendingColumnVisibility[columnId] !== false;
              const columnHeader =
                typeof column.columnDef.header === "string"
                  ? column.columnDef.header
                  : columnId;

              return (
                <DraggableColumnItem
                  key={columnId}
                  columnId={columnId}
                  columnHeader={columnHeader}
                  isVisible={isVisible}
                  onToggleVisibility={togglePendingVisibility}
                />
              );
            })}
          </Reorder.Group>
        )}

        {!isColumnEditMode && <DataTableCore table={table} columns={columns} />}
      </div>
      <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
    </div>
  );
}
