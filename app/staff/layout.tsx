"use client";

import { EmployeeDropdown } from "@/components/employee-dropdown";
import { EmployeeNav } from "@/components/employee-nav";
import useAuth from "@/utils/useAuth";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex h-16 items-center px-8">
        <EmployeeNav className="flex-1" />
        <EmployeeDropdown />
      </div>
      <section className="bg-white">{children}</section>
    </>
  );
}
