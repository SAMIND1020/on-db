import { useEffect, useState } from "react";

import Page from "../../components/general/Page";
import Video from "../../components/general/Video";
import Table from "../../components/tables/Table";
import TableRegistry from "../../components/tables/TableRegistry";
import StatsModal from "../modals/StatsModal";

import { useGetGroups } from "../../hooks/models/useGroups";
import { useGetPeople } from "../../hooks/models/usePeople";
import { useGetEvents } from "../../hooks/models/useEvents";
import { useAuthContext } from "../../contexts/AuthContext";

import { getUpcomingEvents, getMostRecentItem } from "../../helpers";

const HomePage = () => {
    const { user } = useAuthContext();

    const [lastVideoId, setLastVideoId] = useState("");

    const { groups } = useGetGroups();
    const { people } = useGetPeople();
    const { events } = useGetEvents();

    useEffect(() => {
        setLastVideoId(getMostRecentItem(events)?.id_video);
    }, [events]);

    return (
        <Page title="Home" widthFull>
            {/* {Object.keys(user).length !== 0 && user && (
                <div className="flex w-full justify-between gap-3 px-5 mb-2">
                    <p className="text-text2 dark:text-text2-dark text-xl font-medium leading-tight ml-7">
                        {`¡Hi ${user.name.split(" ")[0]}, welcome back!`}
                    </p>
                </div>
            )} */}
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
            </div>
            {Object.keys(user).length !== 0 && (
                <StatsModal groups={groups} people={people} events={events} />
            )}
        </Page>
    );
};
export default HomePage;
