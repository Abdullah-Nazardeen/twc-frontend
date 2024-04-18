import React from "react";
import TitleText from "./title-text";

const LoadingPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <TitleText className="text-xl">Loading...</TitleText>
    </div>
  );
};

export default LoadingPage;
