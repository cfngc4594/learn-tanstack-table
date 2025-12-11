"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

// 扩展列定义的 meta 类型
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    sortLabels?: {
      asc: string;
      desc: string;
    };
  }
}

export type Person = {
  id: string;
  name: string;
  age: number;
  role: string;
  city: string;
};

export const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "姓名",
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue("name") as string;
      const b = rowB.getValue("name") as string;
      return a.localeCompare(b, "zh-CN", { sensitivity: "base" });
    },
    meta: {
      sortLabels: {
        asc: "A-Z",
        desc: "Z-A",
      },
    },
  },
  {
    accessorKey: "age",
    header: "年龄",
    meta: {
      sortLabels: {
        asc: "从小到大",
        desc: "从大到小",
      },
    },
  },
  {
    accessorKey: "role",
    header: "角色",
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue("role") as string;
      const b = rowB.getValue("role") as string;
      return a.localeCompare(b, "zh-CN", { sensitivity: "base" });
    },
    meta: {
      sortLabels: {
        asc: "A-Z",
        desc: "Z-A",
      },
    },
  },
  {
    accessorKey: "city",
    header: "城市",
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue("city") as string;
      const b = rowB.getValue("city") as string;
      return a.localeCompare(b, "zh-CN", { sensitivity: "base" });
    },
    meta: {
      sortLabels: {
        asc: "A-Z",
        desc: "Z-A",
      },
    },
  },
];
