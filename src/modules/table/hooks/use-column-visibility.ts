import { useState } from "react";
import { VisibilityState } from "@tanstack/react-table";

export function useColumnVisibility() {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pendingColumnVisibility, setPendingColumnVisibility] =
    useState<VisibilityState>({});

  const initPendingVisibility = (currentVisibility: VisibilityState) => {
    setPendingColumnVisibility(currentVisibility);
  };

  const applyPendingVisibility = () => {
    setColumnVisibility(pendingColumnVisibility);
  };

  const resetPendingVisibility = () => {
    setPendingColumnVisibility({});
  };

  const togglePendingVisibility = (columnId: string) => {
    setPendingColumnVisibility((prev) => ({
      ...prev,
      [columnId]: prev[columnId] === false ? true : false,
    }));
  };

  return {
    columnVisibility,
    pendingColumnVisibility,
    setColumnVisibility,
    initPendingVisibility,
    applyPendingVisibility,
    resetPendingVisibility,
    togglePendingVisibility,
  };
}
