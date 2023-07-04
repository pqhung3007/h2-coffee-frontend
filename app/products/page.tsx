import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getProducts(): Promise<any> {
  const response = await fetch(
    "https://localhost:7133/api/v1/Product/GetProducts?Offset=0&Limit=3"
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data.Items;
}

export default async function DemoPage() {
  const data = await getProducts();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">List of products</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
