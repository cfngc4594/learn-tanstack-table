import { Table } from "@tanstack/react-table";

export function getEditableColumnIds<TData>(table: Table<TData>): string[] {
  const currentOrder = table.getState().columnOrder;
  return currentOrder.length > 0
    ? currentOrder.filter((id) => {
        const column = table.getColumn(id);
        return column?.getCanHide();
      })
    : table
        .getAllColumns()
        .filter((column) => column.getCanHide())
        .map((column) => column.id);
}

export function getFixedColumnIds<TData>(table: Table<TData>): string[] {
  const currentOrder = table.getState().columnOrder;
  const allColumns = table.getAllColumns();

  return currentOrder.length > 0
    ? currentOrder.filter((id) => {
        const column = table.getColumn(id);
        return column && !column.getCanHide();
      })
    : allColumns
        .filter((column) => !column.getCanHide())
        .map((column) => column.id);
}
