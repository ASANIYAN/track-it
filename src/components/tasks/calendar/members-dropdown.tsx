import {
  CircleUserRound,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactElement, useState } from "react";
import { useGetUserForProject } from "@/tanstack/queries/queries";
import { useProjectIDStore } from "@/store/selected-project-store";

interface MembersDropdownProps {
  children: ReactElement;
  handleSetEmail: (name: string) => void;
}

const MembersDropdown: React.FC<MembersDropdownProps> = ({
  children,
  handleSetEmail,
}) => {
  const { selectedProjectId } = useProjectIDStore();
  const {
    data: usersData,
    isLoading,
    isError,
  } = useGetUserForProject(selectedProjectId!);

  const [search, setSearch] = useState("");
  const filteredUsers =
    usersData?.users.filter((user) =>
      user.user.email.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit bg-white dark:bg-[#384047] shadow-md border-none">
        <DropdownMenuLabel>
          <input
            name="findProfile"
            value={search}
            onChange={handleSearchChange}
            type="text"
            placeholder="yourmail@email.com"
            className="h-7 w-[238px] rounded-[5px] placeholder:text-[#848588] placeholder:text-xs dark:placeholder:text-[#D5D6D7] border border-[#E8ECEE] dark:border-[#2B343B] bg-transparent focus:outline-none focus-visible:outline-none font-normal py-1 px-2.5"
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!isLoading && filteredUsers.length === 0 && (
            <span className="text-black dark:text-white font-medium text-lg flex justify-center text-center">
              No users found
            </span>
          )}
          {!isLoading &&
            filteredUsers.length > 0 &&
            filteredUsers.map((user) => (
              <DropdownMenuItem
                className=""
                key={user.user._id}
                onMouseDown={() => handleSetEmail(user.user.email)}
              >
                <CircleUserRound className="mr-1" height={24} width={24} />
                <span className="text-sm">{user.user.email}</span>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MembersDropdown;
