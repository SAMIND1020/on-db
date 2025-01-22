import { useState } from "react";
import Calendar from "../../components/calendar/Calendar";

import { COLORS_TYPES } from "../../types";
import Page from "../../components/general/Page";
import Button from "../../components/general/Button";
import CreateEventModal from "../modals/CreateEventModal";
import EventModal from "../modals/EventModal";

import { useGetEvents } from "../../hooks/models/useEvents";
import Event from "../../models/Event";

const EventsPage = () => {
    const [createEventModal, setCreateEventModal] = useState(false);
    const [eventInfo, setEventInfo] = useState({});
    const [events, setEvents] = useState([]);

    const onLoadPage = (events) => {
        const newEvents = events.map(
            (event) => new Event(event)
        );
        setEvents(newEvents);
    };

    useGetEvents({ onLoadPage });

    const handleOnClickEvent = ({ event }) =>
        setEventInfo(events.find((e) => e.id == event.id));

    return (
        <>
            <Page
                title="Events"
                actionButtons={
                    <Button onClick={() => setCreateEventModal((c) => !c)}>
                        {!createEventModal ? "New Event" : "Close"}
                    </Button>
                }
                widthFull
            >
                <Calendar
                    onClickEvent={handleOnClickEvent}
                    todayButton
                    className="w-full h-full"
                    events={events.map((event) => ({
                        id: event.id,
                        title: event.name,
                        date: event.init_date.split("T")[0],
                        backgroundColor: COLORS_TYPES[event.group_id - 1],
                        borderColor: COLORS_TYPES[event.group_id - 1],
                        className: "font-normal",
                    }))}
                />
            </Page>
            {createEventModal && <CreateEventModal />}
            {Object.keys(eventInfo).length != 0 && (
                <EventModal eventInfo={eventInfo} setEventInfo={setEventInfo} />
            )}
        </>
    );
};

export default EventsPage;
