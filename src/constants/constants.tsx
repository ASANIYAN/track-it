import {
  Calendar,
  Home,
  Message2,
  People,
  Setting2,
  TickCircle,
} from "iconsax-react";

export const COOKIE_NAME = "trackItToken";

export const navigation = [
  {
    title: "Home",
    path: "/",
    icon: <Home size="18" className="dark:text-white text-color2" />,
  },
  {
    title: "My Tasks",
    path: "/",
    icon: <TickCircle size="18" className="dark:text-white text-color2" />,
  },
  {
    title: "My Plan",
    path: "/",
    icon: <Calendar size="18" className="dark:text-white text-color2" />,
  },
  {
    title: "Inbox",
    path: "/",
    icon: <Message2 size="18" className="dark:text-white text-color2" />,
  },
  {
    title: "People",
    path: "/",
    icon: <People size="18" className="dark:text-white text-color2" />,
  },
  {
    title: "Setting",
    path: "/setting",
    icon: <Setting2 size="18" className="dark:text-white text-color2" />,
  },
];

export const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const categoryOptions = [
  { label: "Design", value: "Design" },
  { label: "Development", value: "Development" },
  { label: "Marketing", value: "Marketing" },
  { label: "Operations", value: "Operations" },
  { label: "Education", value: "Education" },
  { label: "Sales", value: "Sales" },
  { label: "HR", value: "HR" },
  { label: "IT", value: "IT" },
  { label: "Engineering", value: "Engineering" },
];
