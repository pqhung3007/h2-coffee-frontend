import axios from "axios";

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(
    `https://localhost:7133/api/v1/Product/DeleteProduct/${id}`
  );
  return response.status;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.get(
    `https://localhost:7133/api/v1/User/Login?Username=${email}&Password=${password}`
  );
  return response.data;
};
