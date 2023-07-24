import api from ".";

export const loginUser = async (email: string, password: string) => {
  const response = await api.get(
    `/User/Login?Username=${email}&Password=${password}`
  );
  return response.data.Token;
};

export const getRoleByToken = async (token: string) => {
  const response = await api.get("/User/GetRoleByToken", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.RoleName;
};
