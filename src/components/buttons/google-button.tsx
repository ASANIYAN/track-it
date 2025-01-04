"use client";

import Image from "next/image";
import { Button } from "../ui/button";

const GoogleButton = () => {
  return (
    <Button className="border border-color4 bg-transparent w-full h-[48px] flex justify-center items-center gap-2 rounded-[5px] mt-8">
      <Image
        width={20}
        height={20}
        src={"/assets/images/google-img.png"}
        alt="google-image"
      />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
