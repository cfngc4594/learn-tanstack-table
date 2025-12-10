import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Person } from "../types";
import { useBasicTable } from "../hooks/use-basic-table";
import { TableContent } from "./table-content";

type GroupTableProps = {
  groupName: string;
  data: Person[];
  columns: ColumnDef<Person>[];
};

/**
 * 分组表格组件
 */
export const GroupTable = ({ groupName, data, columns }: GroupTableProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const table = useBasicTable({ data, columns });

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer">
            <div className="flex items-center gap-2">
              {isOpen ? (
                <ChevronDown className="size-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="size-5 text-muted-foreground" />
              )}
              <h3 className="text-lg font-semibold">{groupName}</h3>
              <span className="text-sm text-muted-foreground">
                ({data.length})
              </span>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="rounded-md border">
              <TableContent table={table} />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
