"use client";
import React, { useEffect } from "react";
import TitleText from "@/components/common/title-text";
import CustomButton from "@/components/common/custom-button";
import CustomTable from "@/components/common/custom-table";
import { useQuery, QueryFunction  } from "@/lib/react-query-hook";
import { fetchWithAuthorization } from "@/lib/http-helper";
import LoadingPage from "@/components/common/loading-page";
import { useRouter } from "next/navigation";

export type ColumnType = {
  key: "avatar" | "name" | "gender" | "email" | "phoneNumber" | "actionBtns";
  title: string;
}[];

const Columns: ColumnType = [
  { key: "avatar", title: "avatar" },
  { key: "name", title: "full name" },
  { key: "gender", title: "gender" },
  { key: "email", title: "e-mail" },
  { key: "phoneNumber", title: "phone number" },
  { key: "actionBtns", title: "action-btns" },
];

export type ContactType = {
  id: string;
  name: string;
  email: string;   
  phone: string; 
  gender: string;  
  userId: string; 
}

const fetchContacts: QueryFunction<ContactType[]> = async () => {
  const response = await fetchWithAuthorization({
    method: "GET",
    url: "/contacts",
  });
  
  return response;
};

const Page = () => {
  const { data, isPending, isError } = useQuery({
    queryFn: fetchContacts,
    queryKey: ["all-contacts"]
  });

  const router = useRouter()

  if(isPending) {
    return (
      <LoadingPage/>
    )
  }

  console.log("data", data)

  return (
    <div className="flex flex-col w-full h-full gap-7">
      <div className="flex justify-between items-center mt-[4rem] text-white">
        <TitleText>Contacts</TitleText>
        <CustomButton
          className="text-xl"
          variant="primary-outline"
          handleClick={() => router.push("/contacts/new")}
        >
          add new contact
        </CustomButton>
      </div>
      <CustomTable columns={Columns} data={data!} />
    </div>
  );
};

export default Page;
