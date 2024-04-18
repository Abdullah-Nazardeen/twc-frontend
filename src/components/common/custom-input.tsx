import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChangeEventHandler } from "react";

type PropType = {
  placeHolder: string;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  type?: "text" | "number" | "password";
};

const CustomInput = ({ placeHolder, className, value, onChange, type = "text" }: PropType) => {
  return (
    <input
      className={cn(
        "placeholder:text-[#083F46] placeholder:font-semibold placeholder:text-xl rounded-full py-2 px-5 w-2/3 text-[#083F46] font-semibold",
        className
      )}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default CustomInput;
