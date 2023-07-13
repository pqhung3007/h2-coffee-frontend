import { DataTable } from "@/components/data-table";
import axios from "axios";

import { columns } from "./columns";

async function getCategories(): Promise<any> {
  const response = await axios.get(
    "https://localhost:7133/api/v1/Category/GetAllCategories"
  );
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data;
}

export default async function DemoPage() {
  const data = await getCategories();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">List of categories</h1>
      <DataTable columns={columns} data={data} type="category" />
    </div>
  );
}
