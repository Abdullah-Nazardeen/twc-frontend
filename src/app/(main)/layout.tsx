import Image from "next/image";
import LogoutBtn from "@/components/common/logout-btn";




export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="relative flex h-[100vh] overflow-hidden w-full justify-center items-center bg-cover bg-no-repeat bg-opacity-90 bg-[url('/bg-img.png')] ">
      <div className="h-[170vh] w-[150vw] mx-[-25vw] bg-[#083F46] rounded-t-[100%] rounded-b-[100%] transform rotate-[35deg]"></div>
      <div className="absolute py-10 flex flex-col items-center justify-between w-[100vw] h-[100vh]">
        <div className="w-[70%] h-[85vh]">
          <div className="text-white">
            <Image
              src={"/white-logo.png"}
              alt="TWC_Logo"
              width={70}
              height={35}
            />
            <p className="font-extrabold text-2xl">contacts</p>
            <p className="font-semibold text-2xl">portal</p>
          </div>
          <div className="w-full h-full">
            {children}
          </div>
        </div>
        <div className="w-[100%] text-white flex justify-end mr-[10%]">
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
}
