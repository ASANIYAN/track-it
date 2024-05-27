"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";

import "./calendar.css";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CustomInput } from "../inputs/custom-input";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import getRandomRgbaColor from "@/utils/helpers/generate-random-rgb-colors";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalendarComponent } from "../ui/calendar";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface Event {
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  id: number;
  borderColor: string;
  backgroundColor: string;
}

interface CreateEventFormValues {
  title: string;
}

export const createEventValidationSchema = yup.object().shape({
  title: yup.string().required("title is required"),
});

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: "event 1", id: "1" },
    { title: "event 2", id: "2" },
    { title: "event 3", id: "3" },
    { title: "event 4", id: "4" },
    { title: "event 5", id: "5" },
  ]);

  const [date, setDate] = useState<Date>();
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    end: "",
    backgroundColor: "",
    borderColor: "",
    allDay: false,
    id: 0,
  });

  const method = useForm<CreateEventFormValues>({
    resolver: yupResolver(createEventValidationSchema),
  });
  const { handleSubmit, reset } = method;

  const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      end: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  };

  const addEvent = (data: DropArg) => {
    const color = getRandomRgbaColor();
    console.log("DATA", data);

    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  };

  const handleDeleteModal = (data: { event: { id: string } }) => {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  };

  const handleDelete = () => {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete))
    );
    setShowDeleteModal(false);
    setIdToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewEvent({
      borderColor: "",
      backgroundColor: "",
      title: "",
      start: "",
      end: "",
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
    reset({
      title: "",
    });
    setRange(undefined);
  };

  const handleCreateEvent = (data: CreateEventFormValues) => {
    const color = getRandomRgbaColor();
    if (range && range.from !== undefined && range.to !== undefined) {
      const payload = {
        ...newEvent,
        start: range.from.toISOString(),
        end: range.to.toISOString(),
        borderColor: color,
        backgroundColor: color,
        title: data.title,
      };
      setAllEvents([...allEvents, payload]);
      setShowModal(false);
      reset({
        title: "",
      });
    }
  };

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: (eventEl) => {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");

          return { title, id, start };
        },
      });
    }
  }, []);

  useEffect(() => {
    console.log(range);
  }, [range]);

  return (
    <section className="w-full overflow-x-auto no-scrollbar">
      <section className="p-2.5 bg-white dark:bg-[#222B32] rounded-[10px] w-full min-w-[700px]">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridDay,timeGridWeek,dayGridMonth",
          }}
          height={1400}
          events={allEvents}
          nowIndicator={true}
          editable
          droppable
          selectable
          selectMirror
          dateClick={handleDateClick}
          drop={(data) => addEvent(data)}
          eventClick={(data) => handleDeleteModal(data)}
        />
        {/* <div
        id="draggable-el"
        className="ml-8 w-full max-w-[300px] border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50"
      >
        <h1 className="font-bold text-lg text-center text-black">
          {" "}
          Drag Event{" "}
        </h1>
        {events.map((event) => (
          <div
            className="fc-event border-2 p-1 m-2 w-full text-black rounded-md ml-auto text-center bg-white"
            title={event.title}
            key={event.id}
          >
            {event.title}
          </div>
        ))}
      </div> */}

        {/* Create Event Modal Start */}
        <Dialog open={showModal} onOpenChange={handleCloseModal}>
          {/* <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger> */}
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-darkColor2 border-none">
            <DialogHeader>
              <DialogTitle>Add event</DialogTitle>
              <DialogDescription>Create a new event.</DialogDescription>
            </DialogHeader>
            <section className="flex flex-col gap-3 relative">
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
                    <span className="block text-sm text-black dark:text-white mb-1.5">
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
                          {range.from !== undefined &&
                            format(range.from!, "PPP")}{" "}
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
                  className="w-auto left-0 border-none p-0 mt-5 translate-y-6 z-50 bg-white dark:bg-darkColor2"
                >
                  <CalendarComponent
                    className=""
                    min={2}
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
        {/* <AlertDialog open={showModal}>
        <AlertDialogContent className="bg-white dark:bg-darkColor2 border-none">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Add Event
            </AlertDialogTitle>
            <AlertDialogDescription>
              Create an event
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseModal}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#08c7e0] text-white"
              // onClick={handleDelete}
            >
              Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
        {/* Create Event Modal End */}

        {/* Delete Event Modal Start */}
        <AlertDialog open={showDeleteModal}>
          <AlertDialogContent className="bg-white dark:bg-darkColor2 border-none">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this event?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCloseModal}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-[#08c7e0] text-white"
                onClick={handleDelete}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* Delete Event Modal End */}
      </section>
    </section>
  );
};

export default Calendar;
