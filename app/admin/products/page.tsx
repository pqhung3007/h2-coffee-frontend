import { getProducts } from "@/api/products";
import { DataTable } from "@/components/data-table";

import { columns } from "./columns";

export default async function DemoPage() {
  const data = await getProducts();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">List of products</h1>
      <DataTable columns={columns} data={data} type="product" />
    </div>
  );
}
