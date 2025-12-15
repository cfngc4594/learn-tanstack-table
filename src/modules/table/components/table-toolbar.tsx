import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Columns3Icon,
  ListFilterIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { Table } from "@tanstack/react-table";
import { SortDropdownMenu } from "./sort-dropdown-menu";

interface TableToolbarProps<TData> {
  table: Table<TData>;
  mode: "normal" | "columnEdit";
  onSearchFilterClick?: () => void;
  onColumnEditClick?: () => void;
  onCancelClick?: () => void;
  onSaveClick?: () => void;
}

export function TableToolbar<TData>({
  table,
  mode,
  onSearchFilterClick,
  onColumnEditClick,
  onCancelClick,
  onSaveClick,
}: TableToolbarProps<TData>) {
  const isEditMode = mode === "columnEdit";

  return (
    <div className="h-11 flex items-center justify-between p-2 border-b">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <Tabs defaultValue="all">
          <TabsList className="p-0 h-7 bg-transparent">
            <TabsTrigger
              value="all"
              className="px-3 data-[state=active]:bg-muted cursor-pointer"
              disabled={isEditMode}
            >
              全部
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          size="icon"
          variant="ghost"
          className="size-7 cursor-pointer"
          disabled={isEditMode}
        >
          <PlusIcon />
        </Button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {!isEditMode ? (
          <>
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-12 gap-0 cursor-pointer"
              onClick={onSearchFilterClick}
            >
              <SearchIcon className="m-0.5" />
              <ListFilterIcon className="m-0.5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="size-7 cursor-pointer"
              onClick={onColumnEditClick}
            >
              <Columns3Icon />
            </Button>
            <SortDropdownMenu table={table} />
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              className="h-6 px-2 py-1 cursor-pointer"
              onClick={onCancelClick}
            >
              <span>取消</span>
            </Button>
            <Button
              variant="secondary"
              className="h-6 px-2 py-1 cursor-pointer"
              onClick={onSaveClick}
            >
              保存
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
