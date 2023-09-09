import { useState } from "react";
import Tab from "../tab/tab";

type tabOptions = "recent" | "favorites" | "worked";

const HomeMobile = () => {
    const tabs = 
    [ 
        {name: "Recent", alias: "recent"},
        {name: "Favorites", alias: "favorites"},
        {name: "Worked", alias: "worked"}
    ];
    const [ activeTab, setActiveTab ] = useState<tabOptions>("recent");

    return (
        <section>
            <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            { activeTab === tabs[0].alias && "Recent"}
            { activeTab === tabs[1].alias && "Favorites"}
            { activeTab === tabs[2].alias && "Worked"}
        </section>
    );
}
 
export default HomeMobile;