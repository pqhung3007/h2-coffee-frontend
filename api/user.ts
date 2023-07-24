import api from ".";

export async function getAllUsers(): Promise<any> {
  const response = await api.get("/User/GetAllUser?Offset=0&Limit=10");
  if (!response.data) {
    throw new Error(response.statusText);
  }

  return response.data.Items;
}

export async function createUser(data: any): Promise<any> {
  const response = await api.post("/User/CreateUser", {
    Username: data.userName,
    Password: data.password,
    FirstName: data.firstName,
    LastName: data.lastName,
    City: data.city,
    Phone: data.phoneNumber,
    DateOfBirth: data.dob,
  });

  return response.data;
}
