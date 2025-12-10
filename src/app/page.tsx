"use client";

import { TABLE_COLUMNS } from "@/modules/table/constants";
import { GroupedDataTable } from "@/modules/table/data-table";
import { MOCK_DATA } from "@/modules/table/mocks";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { GroupBySelector, GroupByKey } from "@/modules/table/group-by-selector";
import { useTableData } from "@/modules/table/use-table-data";

const Page = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [groupBy, setGroupBy] = useState<GroupByKey>("role");

  const { groupedData } = useTableData({
    data: MOCK_DATA,
    globalFilter,
    groupBy,
  });

  return (
    <div className="h-screen max-w-7xl mx-auto p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="全局搜索..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <GroupBySelector value={groupBy} onValueChange={setGroupBy} />
      </div>
      <GroupedDataTable
        groupedData={groupedData}
        columns={TABLE_COLUMNS}
        groupBy={groupBy}
      />
    </div>
  );
};

export default Page;
