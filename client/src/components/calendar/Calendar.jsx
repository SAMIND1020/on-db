/* eslint-disable react/prop-types */
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import "../../styles/Calendar.css";

const Calendar = ({
    onClickEvent = () => {},
    events = [],
    className = "w-[510px] h-[510px]",
    todayButton = false,
    prevNextButton = true,
}) => {
    const headerButtons = [
        todayButton ? "today" : null,
        prevNextButton ? "prev,next" : null,
    ]
        .filter(Boolean)
        .join(",");

    return (
        <div className={className}>
            <div className="w-full h-full">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="100%"
                    eventClick={onClickEvent}
                    fixedWeekCount={false}
                    headerToolbar={{
                        left: "title",
                        center: "",
                        right: headerButtons,
                    }}
                />
            </div>
        </div>
    );
};

export default Calendar;
