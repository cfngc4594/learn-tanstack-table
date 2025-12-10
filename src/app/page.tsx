"use client";

import { TABLE_COLUMNS } from "@/modules/table/constants";
import { DataTable } from "@/modules/table/data-table";
import { MOCK_DATA } from "@/modules/table/mocks";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

const Page = () => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: MOCK_DATA,
    columns: TABLE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-screen max-w-7xl mx-auto">
      <DataTable table={table} />
    </div>
  );
};

export default Page;
