"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProduct } from "@/utils/api";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-center"
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("Name")}</div>
    ),
  },
  {
    accessorKey: "CategoryName",
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
            <DropdownMenuItem
              onClick={() => (window.location.href = `/products/${product.Id}`)}
            >
              View product details
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <AlertDialog>
              <AlertDialogTrigger className="text-red-600 text-sm px-2">
                Delete product
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Do you really want to delete this product?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600"
                    onClick={() => deleteProduct(product.Id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
