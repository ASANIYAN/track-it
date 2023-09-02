import { Notification } from "iconsax-react";
import { useState } from "react";
import NotificationCard from "../notification-card/notification-card";
import useOutsideClick from "@/hooks/useOutsideClick";

const NotificationInfo = () => {
    const [notificationCard, showNotificationCard] = useState<boolean>(false);

    const handleNotificationCard = () => showNotificationCard(state => !state);
    const ref = useOutsideClick(() => showNotificationCard(false));

    return (
        <section ref={ref}>
            <section className="relative">
                <Notification size="20" color="#848588" className="cursor-pointer" onClick={handleNotificationCard} />
                <div className="bg-error w-1.5 h-1.5 rounded-full absolute top-0 right-[3px]"></div>
            </section>
            { notificationCard && <NotificationCard /> }
        </section>
    );
}
 
export default NotificationInfo;