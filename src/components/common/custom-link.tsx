import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

const CustomLink = ({
  children,
  className,
  handleClick,
}: {
  children: ReactNode;
  handleClick?: () => void;
  className?: string;
}) => {
  return (
    <p
      onClick={handleClick}
      className={cn("underline underline-offset-4 font-lg hover:cursor-pointer", className)}
    >
      {children}
    </p>
  );
};

export default CustomLink;
