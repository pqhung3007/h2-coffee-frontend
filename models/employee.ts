export interface EmployeeDetail {
  Id: number;
  Username: string;
  Password: string;
  FirstName: string;
  LastName: string;
  City: string;
  Status: string;
  Role: Role;
}

interface Role {
  Id: number;
  Name: string;
}
