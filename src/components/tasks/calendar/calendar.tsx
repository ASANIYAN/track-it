"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";

import { ChangeEvent, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { DateRange } from "react-day-picker";

import DeleteEventModal from "./delete-event-modal";
import { CreateEventFormValues, Event, TimeState } from "@/types/types";
import { createEventValidationSchema } from "@/utils/form-schemas/form-schema";
import CreateEventModal from "./create-event-modal";

import "./calendar.css";

const Calendar = () => {
  const [textColor, setTextColor] = useState("FFFFFF");
  const [backgroundColor, setBackgroundColor] = useState("000000");
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    end: "",
    textColor: "",
    backgroundColor: "",
    borderColor: "",
    allDay: false,
    id: 0,
  });
  // const [time, setTime] = useState<TimeState>({ startTime: "", endTime: "" });

  // const handleChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setTime((prevTime) => ({
  //     ...prevTime,
  //     [name]: value,
  //   }));
  // };

  const method = useForm<CreateEventFormValues>({
    resolver: yupResolver(createEventValidationSchema),
  });
  const { reset } = method;

  const handleColorPickerSelection = (color: { hex: string }) => {
    setBackgroundColor(color.hex);
  };

  const handleColorPickerSelectionForText = (color: { hex: string }) => {
    setTextColor(color.hex);
  };

  const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
    setRange({
      from: arg.date,
      to: undefined,
    });
    console.log(arg, "date arg when clicked");

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
      textColor: "",
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
    if (
      range &&
      range.from !== undefined &&
      range.to !== undefined &&
      backgroundColor &&
      textColor
    ) {
      const payload = {
        ...newEvent,
        id: new Date().getTime(),
        start: range.from.toISOString(),
        end: range.to.toISOString(),
        textColor: textColor,
        borderColor: backgroundColor,
        backgroundColor: backgroundColor,
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

        {/* Create Event Modal Start */}
        <CreateEventModal
          // time={time}
          range={range}
          method={method}
          setRange={setRange}
          textColor={textColor}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          backgroundColor={backgroundColor}
          // handleChangeTime={handleChangeTime}
          handleCreateEvent={handleCreateEvent}
          handleColorPickerSelection={handleColorPickerSelection}
          handleColorPickerSelectionForText={handleColorPickerSelectionForText}
        />
        {/* Create Event Modal End */}

        {/* Delete Event Modal Start */}
        <DeleteEventModal
          showDeleteModal={showDeleteModal}
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
        />
        {/* Delete Event Modal End */}
      </section>
    </section>
  );
};

export default Calendar;
