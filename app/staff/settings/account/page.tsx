import { getEmployeeDetail } from "@/api/employees";
import AccountForm from "./account-form";

export default async function SettingsProfilePage() {
  const { Username } = await getEmployeeDetail();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings, including password.
        </p>
      </div>

      <AccountForm username={Username} />
    </div>
  );
}
