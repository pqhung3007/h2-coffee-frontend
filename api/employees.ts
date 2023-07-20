import { EmployeeDetail } from "@/models/employee";
import axios from "axios";

export async function getEmployeeDetail(): Promise<EmployeeDetail> {
  const response = await axios.get(
    "https://localhost:7133/api/v1/User/1009/GetUserDetail"
  );
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data;
}

export async function changeEmployeePassword(
  username: string,
  oldPass: string,
  newPass: string
) {
  const response = await axios.post(
    "https://localhost:7133/api/v1/User/ChangePass",
    {
      Username: username,
      OldPass: oldPass,
      NewPass: newPass,
    }
  );
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data;
}
