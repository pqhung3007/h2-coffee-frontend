import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.get(
    `https://localhost:7133/api/v1/User/Login?Username=${email}&Password=${password}`
  );
  return response.data.Token;
};

export const getRoleByToken = async (token: string) => {
  const response = await axios.get(
    "https://localhost:7133/api/v1/User/GetRoleByToken",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.RoleName;
};
