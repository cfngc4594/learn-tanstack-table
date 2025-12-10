import { ColumnDef } from "@tanstack/react-table";
import { Person } from "./types";
import { SimpleTable } from "./components/simple-table";
import { GroupTable } from "./components/group-table";

type GroupedDataTableProps = {
  groupedData: Record<string, Person[]>;
  columns: ColumnDef<Person>[];
  groupBy: string;
};

/**
 * 分组数据表格主组件
 * 根据 groupBy 参数决定是否分组显示
 */
export const GroupedDataTable = ({
  groupedData,
  columns,
  groupBy,
}: GroupedDataTableProps) => {
  // 如果不分组，直接渲染单个表格
  if (groupBy === "none") {
    const allData = Object.values(groupedData)[0] || [];
    return (
      <div className="rounded-md border">
        <SimpleTable data={allData} columns={columns} />
      </div>
    );
  }

  // 分组渲染
  return (
    <div className="space-y-4">
      {Object.entries(groupedData).map(([groupName, data]) => (
        <GroupTable
          key={groupName}
          groupName={groupName}
          data={data}
          columns={columns}
        />
      ))}
    </div>
  );
};
