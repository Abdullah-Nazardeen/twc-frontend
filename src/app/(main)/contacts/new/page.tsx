"use client";

import React, { useState, useEffect } from "react";
import TitleText from "@/components/common/title-text";
import CustomButton from "@/components/common/custom-button";
import CustomInput from "@/components/common/custom-input";
import { isValidEmail, isValidPhoneNumber } from "@/lib/utils";
import { useMutation } from "@/lib/react-query-hook";
import { fetchWithAuthorization } from "@/lib/http-helper";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [isFirstContact, setIsFirstContact] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsFirstContact = localStorage.getItem("is-first-contact");
      setIsFirstContact(storedIsFirstContact);
    }
  }, []);

  const [contactData, setContactData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    gender: string;
  }>({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      phone: string;
      gender: string;
    }) =>
      fetchWithAuthorization({
        method: "POST",
        url: "/contacts",
        data,
      }),
    onSuccess: () => {
      router.push("/contacts");
    },
  });

  const createContact = () => {
    if (!isFirstContact && typeof window !== "undefined") {
      localStorage.setItem("is-first-contact", "false");
    }

    if (isValidEmail(contactData.email)) {
      if (isValidPhoneNumber(contactData.phone)) {
        mutateAsync({
          name: contactData.fullName,
          email: contactData.email,
          phone: contactData.phone,
          gender: contactData.gender,
        });
      } else {
        alert("Please enter a valid phone number with 10 digits only.");
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="flex flex-col w-full h-full text-white">
      <TitleText className="mt-[8rem]">New Contact</TitleText>
      <div className="my-12 grid grid-cols-2 gap-x-10 gap-y-6 w-full">
        <CustomInput
          className="w-full"
          placeHolder="full name"
          value={contactData.fullName}
          onChange={(event) =>
            setContactData((prev) => ({
              ...prev,
              fullName: event.target.value,
            }))
          }
        />
        <CustomInput
          className="w-full"
          placeHolder="e-mail"
          value={contactData.email}
          onChange={(event) =>
            setContactData((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <CustomInput
          className="w-full"
          type="number"
          placeHolder="phone number"
          value={contactData.phone}
          onChange={(event) =>
            setContactData((prev) => ({
              ...prev,
              phone: event.target.value.toString(),
            }))
          }
        />
        <div className="flex justify-between items-center">
          <label htmlFor="gender" className="text-xl">
            gender
          </label>
          <div className="flex items-center gap-4">
            <input
              placeholder="male"
              type="radio"
              name="gender"
              value={"male"}
              onChange={(event) =>
                setContactData((prev) => ({
                  ...prev,
                  gender: event.target.value.toString(),
                }))
              }
              className="size-4"
            />
            <label className="text-xl">male</label>
          </div>
          <div className="flex items-center gap-4">
            <input
              placeholder="female"
              type="radio"
              name="gender"
              value={"female"}
              onChange={(event) =>
                setContactData((prev) => ({
                  ...prev,
                  gender: event.target.value.toString(),
                }))
              }
              className="size-4"
            />
            <label className="text-xl">female</label>
          </div>
        </div>
      </div>

      <div>
        <CustomButton
          disabled={
            !(
              contactData.email &&
              contactData.fullName &&
              contactData.gender &&
              contactData.phone
            ) || isPending
          }
          loading={isPending}
          variant="primary-outline"
          handleClick={createContact}
          className="text-xl"
        >
          {isFirstContact === "false"
            ? "add contact"
            : "add your first contact"}
        </CustomButton>
      </div>
    </div>
  );
};

export default Page;
