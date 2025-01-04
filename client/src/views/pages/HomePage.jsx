import { useEffect, useState } from "react";

import Page from "../../components/general/Page";
import Video from "../../components/general/Video";
import BarChart from "../../components/chart/BarChart";
import LineChart from "../../components/chart/LineChart";
import Table from "../../components/tables/Table";
import TableRegistry from "../../components/tables/TableRegistry";

import { useAuthContext } from "../../contexts/AuthContext";

import {
    getUserCountByLastMonths,
    getLastMonthVariation,
    getMostRecentItem,
    getUpcomingEvents,
} from "../../helpers";

const HomePage = () => {
    const { user } = useAuthContext();

    const [persons, setPersons] = useState([]);
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [lastVideoId, setLastVideoId] = useState("");

    return (
        <Page title="Home" widthFull>
            {/* <div className="flex w-full justify-between gap-3 px-5 mb-2">
                <p className="text-text2 dark:text-text2-dark text-xl font-medium leading-tight ml-7">
                    {`¡Hi ${user.name.split(" ")[0]}, welcome back!`}
                </p>
            </div> */}
            <div className="px-12 py-2">
                <div className="flex gap-10">
                    <div>
                        <p className="mb-3 font-semibold text-xl text-text dark:text-text-dark">
                            Last Video
                        </p>
                        <Video videoId={lastVideoId} height={280} width={420} />
                    </div>
                    <div>
                        <p className="font-semibold text-xl text-text dark:text-text-dark">
                            Upcoming Events
                        </p>
                        <Table
                            columnNames={["name", "description", "init_date"]}
                        >
                            {getUpcomingEvents(events).map((event) => (
                                <TableRegistry
                                    data={event}
                                    columnNames={[
                                        "name",
                                        "description",
                                        "init_date",
                                    ]}
                                    key={event.id}
                                    textTruncate
                                />
                            ))}
                        </Table>
                    </div>
                </div>
                <p className="mt-2 font-semibold text-xl text-text dark:text-text-dark">
                    Stats
                </p>
                <div className="flex gap-4 py-2">
                    <div className="flex w-full flex-col gap-2 rounded-xl p-6 border borderselected">
                        <p className="text-text dark:text-text-dark text-base font-medium leading-normal">
                            Total People
                        </p>
                        <p className="text-text dark:text-text-dark tracking-light text-2xl font-bold leading-tight">
                            {persons.length}
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 rounded-xl p-6 border borderselected">
                        <p className="text-text dark:text-text-dark text-base font-medium leading-normal">
                            New People (Last 30 Days)
                        </p>
                        <p className="text-text dark:text-text-dark tracking-light text-2xl font-bold leading-tight">
                            {getLastMonthVariation(persons)}
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 rounded-xl p-6 border borderselected">
                        <p className="text-text dark:text-text-dark text-base font-medium leading-normal">
                            Last Person Added
                        </p>
                        <p className="text-text dark:text-text-dark tracking-light text-2xl font-bold leading-tight">
                            {getMostRecentItem(
                                persons,
                                "created_at"
                            )?.name.split(" ")[0] || "Loading..."}
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 rounded-xl p-6 border borderselected">
                        <p className="text-text dark:text-text-dark text-base font-medium leading-normal">
                            Total Events
                        </p>
                        <p className="text-text dark:text-text-dark tracking-light text-2xl font-bold leading-tight">
                            {events.length}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 px-12">
                <div className="rounded-xl h-44 w-full border borderselected">
                    <BarChart
                        data={groups.map((g) => ({
                            data: [g.events.length],
                            label: g.name,
                        }))}
                        labels={["Events Per Group"]}
                    />
                </div>
                <div className="rounded-xl h-44 w-full border borderselected">
                    <BarChart
                        data={groups.map((g) => ({
                            data: [g.people.length],
                            label: g.name,
                        }))}
                        labels={["People Per Group"]}
                    />
                </div>
                <div className="rounded-xl h-44 w-full border borderselected">
                    <LineChart
                        data={getUserCountByLastMonths(persons).map((g) => ({
                            data: g.value,
                            label: g.month,
                        }))}
                        title="People Per Mounth"
                    />
                </div>
            </div>
        </Page>
    );
};
export default HomePage;
