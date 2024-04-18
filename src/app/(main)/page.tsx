"use client";
import { useEffect } from "react";
import TitleText from "@/components/common/title-text";
import CustomButton from "@/components/common/custom-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router  = useRouter()

  return (
    <div className="flex flex-col w-full h-full text-white">
      <div className="mb-12 grid grid-cols-1 gap-y-3 mt-[8rem]">
        <TitleText>Welcome,</TitleText>
        <p className="text-4xl">
          This is where your contacts will live. Click the button below
        </p>
        <p className="text-4xl">to add new contact.</p>
      </div>

      <div>
        <CustomButton variant="primary-outline" handleClick={() => router.push("/contacts/new")}>
          add your first contact
        </CustomButton>
      </div>
    </div>
  );
}
