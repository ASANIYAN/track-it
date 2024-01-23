import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect } from "react";

type TabProps = {
  className?: string;
  tabs: tabList[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<any>>;
};

type tabList = {
  name: string;
  alias: string;
};

const Tab = ({ className, tabs, activeTab, setActiveTab }: TabProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const param = searchParams.get("tab");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return (
    <>
      <section
        className={`flex items-center justify-between ${className} mb-4`}
      >
        {tabs.map((tab) => (
          <Fragment key={tab.alias}>
            <p
              className={`${
                activeTab === tab.alias
                  ? "border-b-2 text-color3 border-color3 dark:text-white dark:border-white"
                  : ""
              }
                             pb-1 text-sm text-center font-medium dark:text-darkColor6 transition-all cursor-pointer`}
              onClick={() => onTab(tab.alias)}
            >
              {tab.name}
            </p>
          </Fragment>
        ))}
      </section>
      <div className="border-b border-color4 dark:border-darkColor4 w-full -translate-y-4" />
    </>
  );
};

export default Tab;
