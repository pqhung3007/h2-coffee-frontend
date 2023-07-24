import { getAllUsers } from "@/api/user";
import { DataTable } from "@/components/data-table";

import { columns } from "./columns";

export default async function DemoPage() {
  const data = await getAllUsers();

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
