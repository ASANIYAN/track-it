import { ProfileCircle } from "iconsax-react";
import Divider from "../divider/divider";
import Toggle from "../inputs/checkbox/toggle";
import { useThemeChecker } from "@/utils/hooks/useThemeChecker";
import { useUserStore } from "@/store/user-store";

const ProfileCard = () => {
  const { themeChecker, setTheme, setThemeChecker } = useThemeChecker();

  const { user } = useUserStore();

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setThemeChecker(e.target.checked);
    if (target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
  };

  return (
    <section
      className="rounded-[10px] top-16 z-10 absolute right-2 xs:right-3 sm:right-5 text-color1 w-[270px] xxs:w-[300px] bg-white 
        shadow-three dark:bg-darkColor4 dark:shadow-darkThree dark:text-white"
    >
      <section className="flex items-center gap-3 p-4 mt-2">
        <ProfileCircle size="32" color="#848588" />
        <div className="flex flex-col gap-0.5">
          {/* <span className="font-medium text-base"> Tajul Islam </span> */}
          <span className="text-color8 font-normal text-xs dark:text-darkColor3">
            {" "}
            {user?.email}{" "}
          </span>
        </div>
      </section>
      <Divider />
      <section className="flex flex-col gap-4 p-4 text-[13px] font-normal">
        <section className="flex items-center justify-between">
          <span> Active status </span>
          <Toggle name="status" handleChange={handleChange} />
        </section>
        <section className="flex items-center justify-between">
          <span> Dark Mode </span>
          <Toggle
            name="mode"
            handleChange={handleThemeChange}
            checked={themeChecker}
          />
        </section>
      </section>
      <Divider />
      <section className="flex flex-col gap-4 p-4 text-[13px] font-normal">
        <span> Settings </span>
        <span> Log out </span>
      </section>
    </section>
  );
};

export default ProfileCard;
