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
import { CalendarIcon } from "lucide-react";
import { TwitterPicker } from "react-color";
import { DateRange } from "react-day-picker";
import { UseFormReturn } from "react-hook-form";

import { Calendar } from "../../ui/calendar";
import { Dispatch, SetStateAction } from "react";
import { CreateEventFormValues } from "@/types/types";

interface CreateEventModalProps {
  showModal: boolean;
  textColor: string;
  backgroundColor: string;
  method: UseFormReturn<any>;
  handleCloseModal: () => void;
  range: DateRange | undefined;
  handleCreateEvent: (data: CreateEventFormValues) => void;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  handleColorPickerSelection: (color: { hex: string }) => void;
  handleColorPickerSelectionForText: (color: { hex: string }) => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  showModal,
  textColor,
  range,
  method,
  setRange,
  backgroundColor,
  handleCloseModal,
  handleCreateEvent,
  handleColorPickerSelection,
  handleColorPickerSelectionForText,
}) => {
  const { handleSubmit } = method;
  return (
    <Dialog open={showModal} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-darkColor2 border-none">
        <DialogHeader>
          <DialogTitle>Add event</DialogTitle>
          <DialogDescription>Create a new event.</DialogDescription>
        </DialogHeader>
        <section className="flex flex-col gap-2.5">
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
                  Start End Date
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
