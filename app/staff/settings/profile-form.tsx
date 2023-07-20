import { getEmployeeDetail } from "@/api/employees";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export async function ProfileForm() {
  const data = await getEmployeeDetail();

  return (
    <div className="space-y-6">
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="email">Employee Id</Label>
        <Input type="text" id="id" disabled value={data.Id} />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" disabled value={data.Username} />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" disabled />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          disabled
          value={`${data.FirstName} ${data.LastName}`}
        />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="city">City</Label>
        <Input type="text" id="city" disabled value={data.City} />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="role">Role</Label>
        <Input type="text" id="role" disabled value={data.Role.Name} />
      </div>
    </div>
  );
}
