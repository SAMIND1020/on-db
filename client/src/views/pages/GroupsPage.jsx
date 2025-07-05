import { useState } from "react";

import NavigationPanel from "../../components/navigation_and_filters/NavigationPanel";
import PaginationPanel from "../../components/tables/PaginationPanel";
import TableRegistry from "../../components/tables/TableRegistry";
import Table from "../../components/tables/Table";
import Page from "../../components/general/Page";

import {
    GroupPageProvider,
    useGroupPageContext,
} from "../../contexts/PageContext";
import { useGetGroups } from "../../hooks/models/useGroups";
import Group from "../../models/Group";
import Person from "../../models/Person";

const GroupsPage = () => {
    const { page, setPage, pages } = useGroupPageContext();

    const columnNames = ["id", "name", "email", "phone", "identity"];

    return (
        <>
            <Page title="Groups">
                <>
                    <Table columnNames={columnNames}>
                        {pages.length != 0 &&
                            page?.members instanceof Array &&
                            page?.members.map((member) => (
                                <TableRegistry
                                    columnNames={columnNames}
                                    key={member.id}
                                    data={member.toJSON()}
                                />
                            ))}
                    </Table>
                    <PaginationPanel />
                </>
            </Page>
            {pages.length != 0 && (
                <div className="w-64">
                    <p className="text-selected dark:text-selected-dark leading-normal my-4 p-2">
                        Groups
                    </p>
                    <NavigationPanel
                        className="text-text dark:text-text-dark text-sm font-bold leading-normal"
                        pages={pages}
                        handleChangePage={setPage}
                        selectedPage={page.path}
                    />
                </div>
            )}
        </>
    );
};

const GroupPageContainer = () => {
    const [groupPages, setGroupPages] = useState([]);

    const onLoad = (groups) => {
        const newGroups = groups.map((group) => new Group(group));

        if (newGroups instanceof Array)
            setGroupPages(() =>
                newGroups.map(({ name, events, members, id }) => {
                    const newPeople = members.map(
                        (person) => new Person(person)
                    );

                    return {
                        name,
                        path: `group-${id}`,
                        events,
                        members: newPeople,
                    };
                })
            );
    };

    useGetGroups({ onLoad });

    return (
        <GroupPageProvider pages={groupPages} initialPage="group-2">
            <GroupsPage />
        </GroupPageProvider>
    );
};

export default GroupPageContainer;
