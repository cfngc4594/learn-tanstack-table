"use client";

import { motion, Reorder, useDragControls } from "framer-motion";
import { EyeIcon, EyeOffIcon, GripVerticalIcon } from "lucide-react";

interface DraggableColumnItemProps {
  columnId: string;
  columnHeader: string;
  isVisible: boolean;
  onToggleVisibility: (columnId: string) => void;
}

export function DraggableColumnItem({
  columnId,
  columnHeader,
  isVisible,
  onToggleVisibility,
}: DraggableColumnItemProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={columnId}
      dragListener={false}
      dragControls={controls}
      className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors ${
        !isVisible ? "opacity-50" : ""
      }`}
    >
      <motion.div
        className="cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => controls.start(e)}
      >
        <GripVerticalIcon className="size-4 text-muted-foreground" />
      </motion.div>
      <button
        onClick={() => onToggleVisibility(columnId)}
        className="flex items-center justify-between gap-2 flex-1 hover:opacity-80 transition-opacity"
      >
        <span className="text-sm font-medium whitespace-nowrap">
          {columnHeader}
        </span>
        <div className="flex items-center justify-center size-5 shrink-0">
          {isVisible ? (
            <EyeIcon className="size-4 text-muted-foreground" />
          ) : (
            <EyeOffIcon className="size-4 text-muted-foreground/50" />
          )}
        </div>
      </button>
    </Reorder.Item>
  );
}
