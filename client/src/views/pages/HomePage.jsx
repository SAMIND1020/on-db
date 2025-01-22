import { useState } from "react";

import Page from "../../components/general/Page";
import Video from "../../components/general/Video";
import Table from "../../components/tables/Table";
import TableRegistry from "../../components/tables/TableRegistry";
import StatsModal from "../modals/StatsModal";

import { useGetGroups } from "../../hooks/models/useGroups";
import { useAuthContext } from "../../contexts/AuthContext";

import Group from "../../models/Group";
import Event from "../../models/Event";
import Person from "../../models/Person";

import { getUpcomingEvents } from "../../helpers";

const HomePage = () => {
    const { user } = useAuthContext();

    const [people, setPeople] = useState([]);
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [lastVideoId, setLastVideoId] = useState("");

    const onLoadPage = (groups) => {
        const newGroups = groups.map(
            ({ createdAt, updatedAt, ...group }) =>
                new Group({
                    created_at: createdAt,
                    updated_at: updatedAt,
                    ...group,
                })
        );

        if (!(newGroups instanceof Array) || newGroups.length === 0) return;

        const newEvents = [];
        const newPeople = [];

        newGroups.forEach((group) => {
            group.events.forEach((event) => {
                if (
                    typeof newEvents.find((e) => event.id === e.id) ===
                    "undefined"
                )
                    newEvents.push(new Event(event));
            });
            group.members.forEach((member) => {
                if (
                    typeof newPeople.find((m) => member.id === m.id) ===
                    "undefined"
                )
                    newPeople.push(new Person(member));
            });
        });

        setGroups(newGroups);
        setEvents(newEvents);
        setPeople(newPeople);
    };

    useGetGroups({ onLoadPage });

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
