import { Table } from "@tanstack/react-table";
import { Reorder } from "framer-motion";
import { DraggableColumnItem } from "./draggable-column-item";

interface ColumnReorderListProps<TData> {
  table: Table<TData>;
  pendingColumnOrder: string[];
  pendingColumnVisibility: Record<string, boolean>;
  onReorder: (newOrder: string[]) => void;
  onToggleVisibility: (columnId: string) => void;
}

export function ColumnReorderList<TData>({
  table,
  pendingColumnOrder,
  pendingColumnVisibility,
  onReorder,
  onToggleVisibility,
}: ColumnReorderListProps<TData>) {
  if (pendingColumnOrder.length === 0) return null;

  return (
    <Reorder.Group
      axis="x"
      values={pendingColumnOrder}
      onReorder={onReorder}
      className="flex items-center p-2 gap-2 overflow-x-auto"
    >
      {pendingColumnOrder.map((columnId) => {
        const column = table.getColumn(columnId);
        if (!column) return null;

        const isVisible = pendingColumnVisibility[columnId] !== false;
        const columnHeader =
          typeof column.columnDef.header === "string"
            ? column.columnDef.header
            : columnId;

        return (
          <DraggableColumnItem
            key={columnId}
            columnId={columnId}
            columnHeader={columnHeader}
            isVisible={isVisible}
            onToggleVisibility={onToggleVisibility}
          />
        );
      })}
    </Reorder.Group>
  );
}
