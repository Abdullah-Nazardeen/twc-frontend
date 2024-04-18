"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const UseAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const token = localStorage.getItem("twc-token");
    const isFirstContact = localStorage.getItem("is-first-contact");

    if (!token && pathname !== "/login") {
      router.push("/login");
    }

    if (token && pathname === "/login") {
      router.push("/");
    }

    if (isFirstContact && pathname === "/") {
      router.push("/contacts");
    }
  }, [pathname]);

  return null;
};

export default UseAuth;
