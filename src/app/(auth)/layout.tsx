import React, { ReactNode } from "react";
import Image from "next/image";

const Layout = ({children}:{children: ReactNode}) => {

  return (
    <div className="flex h-[100vh] overflow-hidden w-full items-center bg-cover bg-no-repeat bg-opacity-90 bg-[url('/bg-img.png')] ">
      <div className="h-[150vh] w-[55%] bg-[#083F46] rounded-r-[50%] flex flex-col justify-center">
        <div className="ml-[7rem] text-white">
         {children}
        </div>
      </div>
      <div className="h-[100vh] w-[45%] flex flex-col justify-center items-start ">
        <div className="ml-20">
          <Image src={"/black-logo.png"} alt="TWC_Logo" width={180} height={90} />
          <p className="font-extrabold text-7xl text-[#083F46]">contacts</p>
          <p className="font-semibold text-7xl">portal</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
