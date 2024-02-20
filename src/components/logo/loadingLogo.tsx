import Image from "next/image";
import React from "react";

function LoadingLogo() {
  return (
    <div className="flex h-[43rem] w-full items-center justify-center">
      <Image
        src="/logo.svg"
        alt="PratikMark"
        width={100}
        height={100}
        className="animate-pulse"
      />
    </div>
  );
}

export default LoadingLogo;
