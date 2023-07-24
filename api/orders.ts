import api from ".";

export async function getOrders() {
  const response = await api.get("/Order/GetAllOrders?Offset=0&Limit=10");
  if (!response.data) {
    throw new Error(response.statusText);
  }
  return response.data.Items;
}

export async function createOrder(data: any) {
  const response = await api.post("/Order", {
    Note: data.note,
    EmployeeName: data.employeeName,
    CustomerName: data.customerName,
    TotalCost: data.totalCost,
    OrderDetails: data.orderDetails,
  });

  return response.data;
}
