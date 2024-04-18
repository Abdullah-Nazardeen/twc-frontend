"use client"
import React, { useState } from "react";
import Login from "@/components/login-register/login";
import Register from "@/components/login-register/register";

const Page = () => {
  const [component, setComponent] = useState("login");

  return (
    <>
      {component === "login" ? (
        <Login setComponent={setComponent} />
      ) : (
        <Register setComponent={setComponent} />
      )}
    </>
  );
};

export default Page;
