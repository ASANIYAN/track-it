import { useState } from "react";
import Tab from "../tab/tab";
import Profile from "./profile";
import Notification from "./notification";
import Account from "./account";

type tabOptions = "profile" | "notifications" | "account";

const SettingComponent = () => {
    const [ activeTab, setActiveTab ] = useState<tabOptions>("profile");

    const tabs = [ 
        {name: "Profile", alias: "profile"},
        {name: "Notification", alias: "notifications"},
        {name: "Account", alias: "account"}
    ];

    return (
        <section className="rounded-[10px] bg-white shadow-md dark:bg-darkColor2 max-w-[800px] mx-auto mt-5 pt-6 pb-10 px-10">
            <section className="">
                <Tab className="max-w-[400px] mx-auto" tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </section>
            { activeTab === tabs[0].alias && <Profile /> }
            { activeTab === tabs[1].alias && <Notification /> }
            { activeTab === tabs[2].alias && <Account /> }
        </section>
    );
}
 
export default SettingComponent;