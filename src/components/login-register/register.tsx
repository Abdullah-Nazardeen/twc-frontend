"use client"
import React, { useState } from "react";
import CustomButton from "@/components/common/custom-button";
import CustomInput from "@/components/common/custom-input";
import CustomLink from "@/components/common/custom-link";
import TitleText from "@/components/common/title-text";
import { useMutation } from "@/lib/react-query-hook"
import { fetchWithoutAuthorization } from "@/lib/http-helper";
import { isValidEmail } from "@/lib/utils";

const Register = ({
  setComponent,
}: {
  setComponent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [registerData, setRegisterData] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { isPending, mutateAsync} = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      fetchWithoutAuthorization({
        method: "POST",
        url: "/signup",
        data,
      }),
    onSuccess: ()=>{
      setComponent("login")
    },
    onError: (err)=>{
      console.log("Error while registering",err);
      alert("Email already registered")
    }
  });

  const handleRegister = () => {
    if (isValidEmail(registerData.email)) {
      if (registerData.password === registerData.confirmPassword) {
        mutateAsync({
          email: registerData.email,
          password: registerData.password,
        });
      } else {
        alert("Passwords entered do not match!");
      }
    } else {
      alert("Please enter a valid email address!");
    }
  };

  return (
    <>
      <TitleText className="mb-10">Register Now!</TitleText>
      <div className="grid grid-cols-1 gap-y-8">
        <CustomInput
          placeHolder="e-mail"
          value={registerData.email}
          onChange={(event) =>
            setRegisterData((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <CustomInput
          placeHolder="create password"
          value={registerData.password}
          onChange={(event) =>
            setRegisterData((prev) => ({
              ...prev,
              password: event.target.value,
            }))
          }
          type="password"
        />
        <CustomInput
          placeHolder="confirm password"
          value={registerData.confirmPassword}
          onChange={(event) =>
            setRegisterData((prev) => ({
              ...prev,
              confirmPassword: event.target.value,
            }))
          }
          type="password"
        />
      </div>
      <CustomButton
        disabled={
          !(
            registerData.email &&
            registerData.password &&
            registerData.confirmPassword
          ) || isPending
        }
        loading={isPending}
        className="my-12"
        variant="primary-outline"
        handleClick={handleRegister}
      >
        Register
      </CustomButton>
      <CustomLink handleClick={() => setComponent("login")}>
        {"< Back to login"}
      </CustomLink>
    </>
  );
};

export default Register;
