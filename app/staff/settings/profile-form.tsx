import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileForm() {
  return (
    <div className="space-y-6">
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="email">Employee Id</Label>
        <Input type="text" id="id" disabled />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" disabled />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" disabled />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" disabled />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="city">City</Label>
        <Input type="text" id="city" disabled />
      </div>
      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="role">Role</Label>
        <Input type="text" id="role" disabled />
      </div>
    </div>
  );
}
