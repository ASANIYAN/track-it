import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect } from "react";

type TabProps = {
    tabs: tabList[],
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<any>>,
};

type tabList = {
    name: string,
    alias: string,
};



const Tab = ({ tabs, activeTab, setActiveTab }: TabProps ) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const param = searchParams.get('tab');
    
  const onTab = (alias: string) => {
    setActiveTab(alias);
    router.push(`${pathname}?tab=${alias}`);
  };

  
  useEffect(() => {
    if (tabs.some((tab) => tab.alias === param) && param !== null) {
      setActiveTab(param);
    } else {
      setActiveTab(tabs[0].alias);
    }
  }, [param]);
    
    return (
        <>
            <section className="flex items-center justify-between">
                { tabs.map((tab) => (
                    <Fragment key={tab.alias}>
                        <p 
                            className={`${activeTab === tab.alias ? 'border-b text-color3 border-color3 dark:text-white dark:border-white' : ''}
                             pb-2 text-sm font-medium dark:text-darkColor6`}
                            onClick={() => onTab(tab.alias)}
                        > 
                            {tab.name}
                        </p>
                    </Fragment>
                ))}
                <div className="bg-color4 h-[1px] dark:bg-darkColor4" />
            </section>
        </>
    );
}
 
export default Tab;