import { DataTable } from "@/components/data-table";
import axios from "axios";

import { columns } from "./columns";

async function getProducts(): Promise<any> {
  const response = await axios.get(
    "https://localhost:7133/api/v1/User/GetAllUser?Offset=0&Limit=10"
  );
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data.Items;
}

export default async function DemoPage() {
  const data = await getProducts();
  const employeeData = data.filter(
    (item: any) => item.Role.Name === "Employee"
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-8">List of employees</h1>
      <DataTable columns={columns} data={employeeData} type="employee" />
    </div>
  );
}
