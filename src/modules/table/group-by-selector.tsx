import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { Person } from "./types";

export type GroupByKey = keyof Person | "none";

export const GROUPBY_OPTIONS = [
  { value: "none" as const, label: "不分组" },
  { value: "role" as const, label: "按角色" },
  { value: "city" as const, label: "按城市" },
  { value: "age" as const, label: "按年龄" },
];

type GroupBySelectorProps = {
  value: GroupByKey;
  onValueChange: (value: GroupByKey) => void;
};

export const GroupBySelector = ({
  value,
  onValueChange,
}: GroupBySelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ListFilter className="h-4 w-4" />
          分组方式
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>选择分组字段</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(val) => onValueChange(val as GroupByKey)}
        >
          {GROUPBY_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
