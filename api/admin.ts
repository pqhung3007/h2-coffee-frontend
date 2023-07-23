import axios from "axios";

export async function getTotalMonthlyRevenue() {
  const response = await axios.get(
    "https://localhost:7133/api/v1/Order/GetTotalPriceOrderInMonth"
  );
  return response.data.TotalPriceOrderInMonth;
}

export async function getTotalMonthlyOrders() {
  const response = await axios.get(
    "https://localhost:7133/api/v1/Order/GetTotalOrderInMonth"
  );
  return response.data.Total;
}

export async function getNumberOfActiveProducts() {
  const response = await axios.get(
    "https://localhost:7133/api/v1/Product/GetTotalProductActive"
  );
  return response.data.Total;
}

export async function getNumberOfActiveEmployees() {
  const response = await axios.get(
    "https://localhost:7133/api/v1/User/GetTotalUserActive"
  );
  return response.data.Total;
}
