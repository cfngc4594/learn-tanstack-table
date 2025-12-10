import { ColumnDef } from "@tanstack/react-table";
import { Person } from "./types";

export const TABLE_COLUMNS: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "姓名",
  },
  {
    accessorKey: "age",
    header: "年龄",
  },
  {
    accessorKey: "role",
    header: "角色",
  },
  {
    accessorKey: "city",
    header: "城市",
  },
];
