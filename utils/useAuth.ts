"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("coffee_token");

    if (!accessToken) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return { isLoading };
}
