import api from ".";

export async function getTotalMonthlyRevenue() {
  const response = await api.get("/Order/GetTotalPriceOrderInMonth");
  return response.data.TotalPriceOrderInMonth;
}

export async function getTotalMonthlyOrders() {
  const response = await api.get("/Order/GetTotalOrderInMonth");
  return response.data.Total;
}

export async function getNumberOfActiveProducts() {
  const response = await api.get("/Product/GetTotalProductActive");
  return response.data.Total;
}

export async function getNumberOfActiveEmployees() {
  const response = await api.get("/User/GetTotalUserActive");
  return response.data.Total;
}
