import { useState } from "react";
import dynamic from "next/dynamic";

import { ProfileCircle } from "iconsax-react";

import useOutsideClick from "@/utils/hooks/useOutsideClick";

const ProfileCard = dynamic(() => import("../general/profile-card"), {
  ssr: false,
});

const ProfileInfo = () => {
  const [profileInfo, showProfileInfo] = useState<boolean>(false);

  const handleProfileInfo = () => showProfileInfo((state) => !state);
  const ref = useOutsideClick(() => showProfileInfo(false));

  return (
    <section ref={ref}>
      <ProfileCircle
        size="20"
        color="#848588"
        className="cursor-pointer"
        onClick={handleProfileInfo}
      />
      {profileInfo && <ProfileCard />}
    </section>
  );
};

export default ProfileInfo;
