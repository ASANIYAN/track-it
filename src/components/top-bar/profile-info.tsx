import { useState } from "react";

import { ProfileCircle } from "iconsax-react";

import useOutsideClick from "@/hooks/useOutsideClick";
import ProfileCard from "../general/profile-card";

const ProfileInfo = () => {
    const [profileInfo, showProfileInfo] = useState<boolean>(false);

    const handleProfileInfo = () => showProfileInfo(state => !state);
    const ref = useOutsideClick(() => showProfileInfo(false));
    
    return (
        <section ref={ref}>
            <ProfileCircle size="20" color="#848588" className="cursor-pointer" onClick={handleProfileInfo} />
            { profileInfo && <ProfileCard /> }
        </section>
    );
}
 
export default ProfileInfo;