import { ProfileCircle } from "iconsax-react";

import "./notification-card.css";

const NotificationCard = () => {
    return (
        <section
            className="notification-card rounded-[10px] top-[62px] z-10 px-2 py-4 d:p-4 absolute d:right-2 sm:right-5 text-color1 
            w-full max-w-[500px] h-[80vh] bg-white shadow-three overflow-y-auto dark:bg-darkColor4 dark:shadow-darkThree dark:text-white"
        >
                <section className="flex justify-between items-center font-medium">
                    <h4 className="text-color1 text-lg dark:text-white"> Notification </h4>
                    <p className="text-color6 text-xs"> Mark all as read </p>
                </section>

                <section className="mt-4">
                    <section className="flex gap-2 p-2.5 hover:rounded-md cursor-pointer hover:bg-color12 dark:hover:bg-darkColor5">
                        <ProfileCircle size="32" color="#848588" />
                        <div className="flex flex-col gap-1 items-start font-medium">
                            <span className="text-color11 text-[11px] dark:text-darkColor6"> Marketing & sales </span>
                            <span className="text-color7 text-[13px] dark:text-white"> Assigned you to a task </span>
                            <span className="text-color9 text-[11px] dark:text-darkColor3"> 3 min ago </span>
                        </div>
                    </section>
                </section>

        </section>
    );
}
 
export default NotificationCard;