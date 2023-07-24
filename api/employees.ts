import { EmployeeDetail } from "@/models/employee";
import api from ".";

export async function getEmployeeDetail(): Promise<EmployeeDetail> {
  const response = await api.get("/User/1009/GetUserDetail");
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
  const response = await api.post("/User/ChangePass", {
    Username: username,
    OldPass: oldPass,
    NewPass: newPass,
  });
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data;
}
