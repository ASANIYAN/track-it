"use client";

import Image from "next/image";

const GoogleButton = () => {
    return (
        <button className="border border-color4 w-full h-[48px] flex justify-center items-center gap-2 rounded-[5px] mt-8">  
        <Image 
            width={20}
            height={20}
            src={"/images/google-img.png"}
            alt="google-image"
        />
        Continue with Google
    </button>
    );
}
 
export default GoogleButton;