import api from ".";

export async function getProducts(): Promise<any> {
  const response = await api.get("/Product/GetProducts?Offset=0&Limit=10");
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data.Items;
}

export async function getProductById(id: string): Promise<any> {
  const response = await api.get(`/Product/${id}`);
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data;
}

export async function createProduct(product: any): Promise<any> {
  const response = await api.post("/Product/CreateProduct", {
    Name: product.productName,
    CategoryId: parseInt(product.category),
    UnitsInStock: parseInt(product.unitsInStock),
    Description: product.description,
    UnitPrice: parseInt(product.price),
    IsSignature: product.isSignature,
    Discount: 0,
    Status: 1,
    ImageUrl: product.imageUrl,
  });
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response;
}

export async function updateProduct(product: any): Promise<any> {
  const response = await api.post("/Product/UpdateProduct", product);
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response;
}

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/Product/DeleteProduct/${id}`);
  return response.status;
};
