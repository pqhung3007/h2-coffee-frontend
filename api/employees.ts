import axios from "axios";

export async function getEmployeeDetail() {
  const response = await axios.get(
    "https://localhost:7133/api/v1/User/1009/GetUserDetail"
  );
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data;
}
