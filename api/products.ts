import axios from "axios";

export async function getProducts(): Promise<any> {
  const response = await axios.get(
    "https://localhost:7133/api/v1/Product/GetProducts?Offset=0&Limit=10"
  );
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data.Items;
}
