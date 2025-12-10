import { ColumnDef } from "@tanstack/react-table";

export type Person = {
  id: string;
  name: string;
  age: number;
  role: string;
  city: string;
};

export const columns: ColumnDef<Person>[] = [
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
