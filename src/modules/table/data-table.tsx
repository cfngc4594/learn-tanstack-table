"use client";

import {
  ColumnDef,
  getCoreRowModel,
  // getFilteredRowModel,
  getPaginationRowModel,
  // getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
// import { Input } from "@/components/ui/input";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableCore } from "./data-table-core";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpDownIcon,
  Columns3Icon,
  ListFilterIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";

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
  // const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      // globalFilter,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {/* <Input
        placeholder="全局搜索..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      /> */}
      <div className="flex flex-col border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-2 border-b">
          <div className="flex items-center gap-2">
            <Tabs defaultValue="all">
              <TabsList className="p-0 h-7 bg-transparent">
                <TabsTrigger value="all" className="px-3 data-[state=active]:bg-muted">
                  全部
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button size="icon" variant="ghost" className="size-7">
              <PlusIcon />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" className="h-7 w-12 gap-0">
              <SearchIcon className="m-0.5" />
              <ListFilterIcon className="m-0.5" />
            </Button>
            <Button size="icon" variant="outline" className="size-7">
              <Columns3Icon />
            </Button>
            <Button size="icon" variant="outline" className="size-7">
              <ArrowUpDownIcon />
            </Button>
          </div>
        </div>
        <DataTableCore table={table} columns={columns} />
      </div>
      <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
    </div>
  );
}
