"use client";

/* import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"; */
import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  name: string;
  unitInStock: number;
  price: number;
  description: string;
  status: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "UnitsInStock",
    header: "Units In Stock",
  },
  {
    accessorKey: "UnitPrice",
    header: "Unit Price",
  },
  {
    accessorKey: "CreatedDate",
    header: "Created Date",
  },
];
