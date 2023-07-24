import api from ".";

export async function getAllCategories() {
  const response = await api.get("/Category/GetAllCategories");
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data;
}
