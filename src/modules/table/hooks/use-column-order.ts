import { useState } from "react";
import { ColumnOrderState } from "@tanstack/react-table";

export function useColumnOrder() {
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [pendingColumnOrder, setPendingColumnOrder] =
    useState<ColumnOrderState>([]);

  const initPendingOrder = (currentOrder: ColumnOrderState) => {
    setPendingColumnOrder(currentOrder);
  };

  const resetPendingOrder = () => {
    setPendingColumnOrder([]);
  };

  return {
    columnOrder,
    pendingColumnOrder,
    setColumnOrder,
    setPendingColumnOrder,
    initPendingOrder,
    resetPendingOrder,
  };
}
