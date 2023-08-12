import { Calendar, DocumentText, Home, Message2, People, TickCircle } from "iconsax-react";

export const navigation = [
    { title: "Home", icon: <Home size="18" className="dark:text-white text-color2" /> },
    { title: "My Tasks", icon: <TickCircle size="18" className="dark:text-white text-color2" /> },
    { title: "My Plan", icon: <Calendar size="18" className="dark:text-white text-color2" /> },
    { title: "Inbox", icon: <Message2 size="18" className="dark:text-white text-color2" /> },
    { title: "People", icon: <People size="18" className="dark:text-white text-color2" /> },
    { title: "Reporting", icon: <DocumentText size="18" className="dark:text-white text-color2" /> }
];
