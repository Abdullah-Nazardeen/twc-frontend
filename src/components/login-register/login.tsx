"use client";
import React, { useState } from "react";
import CustomButton from "@/components/common/custom-button";
import CustomInput from "@/components/common/custom-input";
import CustomLink from "@/components/common/custom-link";
import TitleText from "@/components/common/title-text";
import { useMutation } from "@/lib/react-query-hook";
import { fetchWithoutAuthorization } from "@/lib/http-helper";
import { useRouter } from "next/navigation";
import { isValidEmail } from "@/lib/utils";

const Login = ({
  setComponent,
}: {
  setComponent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();

  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      fetchWithoutAuthorization({
        method: "POST",
        url: "/signin",
        data,
      }),
    onSuccess: (data) => {
      localStorage.setItem("twc-token", data.token);
      if (data.newUser) {
        router.push("/");
      } else {
        router.push("/contacts");
      }
    },
    onError: (err) => {
      console.log("Error login", err);
      alert("Invalid credentials");
    },
  });

  const handleLogin = () => {
    if (isValidEmail(loginData.email)) {
      mutateAsync({
        email: loginData.email,
        password: loginData.password,
      });
    } else {
      alert("Please enter valid email address");
    }
  };

  return (
    <>
      <TitleText className="mb-4">Hi, there,</TitleText>
      <div className="mb-12">
        <p className="text-4xl">Welcome to our</p>
        <p className="text-4xl">contacts portal</p>
      </div>
      <div className="grid grid-cols-1 gap-y-8">
        <CustomInput
          placeHolder="e-mail"
          value={loginData.email}
          onChange={(event) =>
            setLoginData((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <CustomInput
          placeHolder="password"
          value={loginData.password}
          type="password"
          onChange={(event) =>
            setLoginData((prev) => ({ ...prev, password: event.target.value }))
          }
        />
      </div>
      <div className="mt-12 flex justify-between items-center w-1/2">
        <CustomButton
          disabled={!(loginData.email && loginData.password) || isPending}
          loading={isPending}
          variant="primary-outline"
          handleClick={handleLogin}
        >
          login
        </CustomButton>
        <p className="font-lg">or</p>
        <CustomLink handleClick={() => setComponent("register")}>
          Click here to register
        </CustomLink>
      </div>
    </>
  );
};

export default Login;
