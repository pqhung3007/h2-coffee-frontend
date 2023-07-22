/* Sort order by date https://stackoverflow.com/questions/76484260/shadcn-ui-data-table-date-range-filter */
import { getOrders } from "@/api/orders";
import { DataTable } from "@/components/data-table";

import { columns } from "./columns";

export default async function DemoPage() {
  const data = await getOrders();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">List of orders</h1>
      <DataTable columns={columns} data={data} type="order" />
    </div>
  );
}
