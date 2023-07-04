import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getProducts(): Promise<any> {
  const response = await axios.get(
    "https://localhost:7133/api/v1/Product/GetProducts?Offset=0&Limit=3"
  );
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data.Items;
}

export default async function DemoPage() {
  const data = await getProducts();
  console.log("🚀 ~ file: page.tsx:28 ~ DemoPage ~ data:", data);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">List of products</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
