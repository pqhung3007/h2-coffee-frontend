import api from ".";

export async function getOrders() {
  const response = await api.get("/Order/GetAllOrders?Offset=0&Limit=10");
  if (!response.data) {
    throw new Error(response.statusText);
  }
  return response.data.Items;
}
