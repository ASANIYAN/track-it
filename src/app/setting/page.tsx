"use client";

import SettingComponent from "@/components/setting/setting-component";
import AuthWrapper from "@/components/wrappers/auth-wrapper";

const Setting = () => {
    return (
        <main>
            <AuthWrapper>
                <SettingComponent />
            </AuthWrapper>
        </main>  
    );
}
 
export default Setting;