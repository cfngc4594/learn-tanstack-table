"use client";

import { TABLE_COLUMNS } from "@/modules/table/constants";
import { DataTable } from "@/modules/table/data-table";
import { MOCK_DATA } from "@/modules/table/mocks";
import {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: MOCK_DATA,
    columns: TABLE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  return (
    <div className="h-screen max-w-7xl mx-auto p-6 space-y-4">
      <Input
        placeholder="全局搜索..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />
      <DataTable table={table} />
    </div>
  );
};

export default Page;
