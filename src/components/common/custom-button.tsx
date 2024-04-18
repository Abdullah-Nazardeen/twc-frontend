"use client";
import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type PropType = {
  children: ReactNode;
  className?: string;
  variant: "primary" | "primary-outline" | "secondary-outline";
  handleClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const CustomButton = ({
  children,
  className,
  variant,
  handleClick,
  disabled = false,
  loading = false,
}: PropType) => {
  let backgroundColor;
  let borderColor;
  let textColor;

  switch (variant) {
    case "primary":
      backgroundColor = "#083F46";
      textColor = "white";
      borderColor = "#083F46";
      break;
    case "primary-outline":
      backgroundColor = "#083F46";
      textColor = "white";
      borderColor = "white";
      break;
    case "secondary-outline":
      backgroundColor = "white";
      textColor = "#083F46";
      borderColor = "#083F46";
      break;
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        `bg-[${backgroundColor}] text-[${textColor}] border-[${borderColor}] border py-1 px-7 rounded-full ${disabled && "opacity-50"}`,
        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default CustomButton;
