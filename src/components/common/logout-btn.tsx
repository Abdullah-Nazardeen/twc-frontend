"use client";
import React from "react";
import CustomLink from "@/components/common/custom-link";
import { CircleArrowOutUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("twc-userId");
      localStorage.removeItem("twc-token");
      router.replace("/login");
    }
  };

  return (
    <div
      className={"hover:cursor-pointer flex items-center"}
      onClick={() => console.log("logout")}
    >
      <CircleArrowOutUpLeft className={"transform -rotate-45 mr-3"} />
      <CustomLink className="text-xl" handleClick={logout}>
        logout
      </CustomLink>
    </div>
  );
};

export default LogoutBtn;
