"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export interface Product {
  Id: string;
  Name: string;
  Category: {
    Id: string;
    Name: string;
  };
  UnitsInStock: number;
  UnitPrice: number;
  CreatedDate: string;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "Category.Name",
    header: "Category",
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
    cell: ({ row }) => {
      const date = row.getValue("CreatedDate");
      if (typeof date === "string") {
        return <span>{new Date(date).toLocaleDateString()}</span>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      console.log("🚀 ~ file: columns.tsx:53 ~ product:", product);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.Name)}
            >
              Copy product name
            </DropdownMenuItem>
            {/* navigate to home when selecting*/}
            <DropdownMenuItem
              onClick={() => (window.location.href = `/products/${product.Id}`)}
            >
              View product details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
