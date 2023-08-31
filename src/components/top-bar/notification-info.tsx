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
            <Notification size="20" color="#848588" className="cursor-pointer" onClick={handleNotificationCard} />
            { notificationCard && <NotificationCard /> }
        </section>
    );
}
 
export default NotificationInfo;