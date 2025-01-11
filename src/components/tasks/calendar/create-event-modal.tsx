import { CustomInput } from "@/components/inputs/custom-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CircleUserRound, X } from "lucide-react";
import { TwitterPicker } from "react-color";

import { Calendar } from "../../ui/calendar";
import { CreateEventModalProps } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MembersDropdown from "./members-dropdown";
import { useEffect, useState } from "react";
import { useGetUserForProject } from "@/tanstack/queries/queries";
import { usePathname, useRouter } from "next/navigation";
import { useProjectIDStore } from "@/store/selected-project-store";

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  time,
  range,
  allDay,
  method,
  showModal,
  textColor,
  setRange,
  backgroundColor,
  handleCloseModal,
  handleCreateEvent,
  handleChangeTime,
  handleColorPickerSelection,
  handleColorPickerSelectionForText,
}) => {
  const { handleSubmit } = method;
  const [email, setEmail] = useState("");

  const handleSetEmail = (email: string) => setEmail(email);

  return (
    <Dialog open={showModal} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-darkColor2 border-none h-full overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
          <DialogDescription>Create a new task.</DialogDescription>
        </DialogHeader>
        <section className="flex flex-col gap-5">
          <section className="flex flex-col gap-2.5">
            <span className="block text-xs text-black dark:text-white">
              Assigned To
            </span>
            <div className="flex flex-col gap-1">
              {email && (
                <span className="flex gap-1.5 items-center">
                  {email}{" "}
                  <X
                    className="text-color6 cursor-pointer"
                    onMouseDown={() => handleSetEmail("")}
                    size={16}
                  />{" "}
                </span>
              )}

              <MembersDropdown handleSetEmail={handleSetEmail}>
                <div
                  role="button"
                  className="rounded-full border-dotted border border-[#878B8F] text-[#878B8F] h-6 w-6 flex justify-center items-center"
                >
                  +
                </div>
              </MembersDropdown>
            </div>
          </section>
          <CustomInput
            name="title"
            label="Title"
            defaultType="text"
            className="w-full focus-visible:ring-transparent"
            method={method}
          />
          <Popover>
            <PopoverTrigger asChild>
              <section>
                <span className="block text-xs text-black dark:text-white mb-1.5">
                  Start-Due Date
                </span>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !range && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {range !== undefined ? (
                    <>
                      {range.from !== undefined && format(range.from!, "PPP")}{" "}
                      {"-"}
                      {range.to !== undefined && format(range.to!, "PPP")}
                    </>
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </section>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="start"
              className="w-auto left-0 border-none p-0 mt-5 z-50 bg-white dark:bg-darkColor2"
            >
              <Calendar
                className=""
                min={2}
                mode="range"
                selected={range}
                onSelect={setRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* time select */}
          {!allDay && (
            <section className="flex gap-2.5">
              <div className="flex flex-col gap-1.5">
                <span className="block text-xs text-black dark:text-white mb-2.5">
                  Start Time
                </span>
                <input
                  className="bg-transparent focus-visible:outline-none"
                  type="time"
                  name="startTime"
                  value={time.startTime}
                  aria-label="Start Time"
                  onChange={handleChangeTime}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="block text-xs text-black dark:text-white mb-2.5">
                  End Time
                </span>
                <input
                  className="bg-transparent focus-visible:outline-none"
                  type="time"
                  name="endTime"
                  value={time.endTime}
                  aria-label="End Time"
                  onChange={handleChangeTime}
                />
              </div>
            </section>
          )}

          {/* color picker for background */}
          <section className="flex flex-col gap-1">
            <span className="block text-xs text-black dark:text-white mb-1.5">
              Background Color
            </span>
            <TwitterPicker
              triangle="hide"
              className="dark:!bg-darkColor2"
              color={backgroundColor}
              onChangeComplete={handleColorPickerSelection}
            />
          </section>
          {/* color picker for text */}
          <section className="flex flex-col gap-1">
            <span className="block text-xs text-black dark:text-white mb-1.5">
              Text Color
            </span>
            <TwitterPicker
              triangle="hide"
              className="dark:!bg-darkColor2"
              color={textColor}
              onChangeComplete={handleColorPickerSelectionForText}
            />
          </section>
        </section>
        <DialogFooter className="gap-2.5">
          <DialogClose onClick={handleCloseModal}>
            <Button className="mr-2.5 border border-black dark:border-white w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit(handleCreateEvent)}
            className="bg-[#08c7e0] text-white hover:bg-[#08c7e0]"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
