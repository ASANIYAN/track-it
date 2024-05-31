import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MembersDropdownProps {
  children: ReactElement;
}

const MembersDropdown: React.FC<MembersDropdownProps> = ({ children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[278px] bg-white dark:bg-[#384047] shadow-md border-none">
        <DropdownMenuLabel>
          <input
            name="findProfile"
            type="text"
            placeholder="yourmail@email.com"
            className="h-7 w-[238px] rounded-[5px] placeholder:text-[#848588] placeholder:text-xs dark:placeholder:text-[#D5D6D7] border border-[#E8ECEE] dark:border-[#2B343B] bg-transparent focus:outline-none focus-visible:outline-none font-normal py-1 px-2.5"
          />
        </DropdownMenuLabel>
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Avatar className="h-[22px] w-[22px] mr-2.5">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm">Sadio Mane</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Avatar className="h-[22px] w-[22px] mr-2.5">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm">Sadio Mane</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Avatar className="h-[22px] w-[22px] mr-2.5">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm">Sadio Mane</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MembersDropdown;
