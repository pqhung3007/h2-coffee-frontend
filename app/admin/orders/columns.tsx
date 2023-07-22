"use client";

import { OrderDetails } from "@/models/order";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OrderDetails>[] = [
  {
    accessorKey: "Id",
    header: "Order Id",
  },
  {
    accessorKey: "CustomerName",
    header: "Customer Name",
  },
  {
    accessorKey: "EmployeeName",
    header: "Employee Name",
  },
  {
    accessorKey: "TotalCost",
    header: "Total",
  },
  {
    accessorKey: "CreatedDate",
    header: "Created At",
    cell: ({ row }) => {
      const createdDate = row.getValue("CreatedDate");
      if (typeof createdDate === "string") {
        const date = new Date(createdDate);
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-GB", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return (
          <div>
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>
        );
      }
    },
  },
];
