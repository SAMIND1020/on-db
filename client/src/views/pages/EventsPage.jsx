import { useState } from "react";
import Calendar from "../../components/calendar/Calendar";

import { COLORS_TYPES } from "../../types";
import Page from "../../components/general/Page";
import Button from "../../components/general/Button";
import CreateEventModal from "../modals/CreateEventModal";
import EventModal from "../modals/EventModal";

import { useGetEvents } from "../../hooks/models/useEvents";

const EventsPage = () => {
    const [activeModal, setActiveModal] = useState();
    const [eventInfo, setEventInfo] = useState({});

    const { events } = useGetEvents();

    const handleModal = (type, info = {}) => {
        if (!type) {
            setActiveModal(null);
            setEventInfo({});
            return;
        }

        setEventInfo(info);
        setActiveModal(type);
    };

    const handleOnClickEvent = ({ event }) => {
        const selected = events.find((e) => e.id == event.id);
        if (selected) handleModal("info", selected);
    };

    return (
        <>
            <Page
                title="Events"
                actionButtons={
                    <Button
                        onClick={() =>
                            activeModal === "create"
                                ? handleModal(null)
                                : handleModal("create")
                        }
                    >
                        {activeModal === "create" ? "Close" : "New Event"}
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
                        date: new Date(event.init_date)
                            .toISOString()
                            .split("T")[0],
                        backgroundColor: COLORS_TYPES[event.group_id - 1],
                        borderColor: COLORS_TYPES[event.group_id - 1],
                        className: "font-normal",
                    }))}
                />
            </Page>
            {activeModal === "create" && <CreateEventModal />}
            {activeModal === "info" && Object.keys(eventInfo).length != 0 && (
                <EventModal
                    eventInfo={eventInfo}
                    setEventInfo={() => handleModal(null)}
                />
            )}
        </>
    );
};

export default EventsPage;
