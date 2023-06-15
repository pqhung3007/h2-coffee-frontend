"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenuItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  // make an item active if the current route is the same as the href
  let isActive = usePathname() === href;

  return (
    <Link
      href={href}
      className={
        "flex items-center p-2 text-gray-800 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-white group" +
        (isActive ? " bg-emerald-200" : "")
      }
    >
      {children}
    </Link>
  );
}
