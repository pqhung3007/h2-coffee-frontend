"use client";

import LoadingScreen from "@/components/loading";
import { MenuItem } from "@/components/menu-item";
import useAuth from "@/utils/useAuth";
import {
  CircleDollarSign,
  Contact,
  CreditCard,
  LogOut,
  PanelLeftInactive,
  Receipt,
  Settings,
  User2,
  Utensils,
} from "lucide-react";
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
    return <LoadingScreen />;
  }

  const handleLogout = () => {
    localStorage.removeItem("coffee_token");
  };

  return (
    <>
      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li>
              <MenuItem href="/admin">
                <PanelLeftInactive className="text-gray-500 group-hover:text-gray-700" />
                <span className="ml-3">Dashboard</span>
              </MenuItem>
            </li>
            <li>
              <MenuItem href="/admin/products">
                <Utensils className="text-gray-500 group-hover:text-gray-700" />
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </MenuItem>
            </li>
            <li>
              <MenuItem href="/admin/orders">
                <Receipt className="text-gray-500 group-hover:text-gray-700" />
                <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
              </MenuItem>
            </li>
            <li>
              <MenuItem href="/admin/categories">
                <CreditCard className="text-gray-500 group-hover:text-gray-700" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Categories
                </span>
              </MenuItem>
            </li>
            <li>
              <MenuItem href="/admin/employees">
                <Contact className="text-gray-500 group-hover:text-gray-700" />
                <span className="flex-1 ml-3 whitespace-nowrap">Employees</span>
              </MenuItem>
            </li>
            <li>
              <MenuItem href="/">
                <User2 className="text-gray-500 group-hover:text-gray-700" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Customer Management
                </span>
              </MenuItem>
            </li>
            <li>
              <MenuItem href="/">
                <CircleDollarSign className="text-gray-500 group-hover:text-gray-700" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Promotions
                </span>
              </MenuItem>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <MenuItem href="/">
                <Settings className="text-gray-500 group-hover:text-gray-700" />
                <span className="ml-4">Settings</span>
              </MenuItem>
            </li>
            <li>
              <MenuItem href="/">
                <LogOut className="text-gray-500 group-hover:text-gray-700" />
                <span className="ml-3" onClick={handleLogout}>
                  Log Out
                </span>
              </MenuItem>
            </li>
          </ul>
          <p className="mt-auto font-medium text-gray-800">
            Welcome back, admin!
          </p>
        </div>
      </aside>
      <section className="pl-0 md:pl-64 w-screen overflow-x-auto">
        {children}
      </section>
    </>
  );
}
