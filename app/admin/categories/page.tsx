import { DataTable } from "@/components/data-table";

import { getAllCategories } from "@/api/categories";
import { columns } from "./columns";

export default async function DemoPage() {
  const data = await getAllCategories();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">List of categories</h1>
      <DataTable columns={columns} data={data} type="category" />
    </div>
  );
}
