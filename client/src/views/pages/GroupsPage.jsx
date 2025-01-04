import NavigationPanel from "../../components/navigation_and_filters/NavigationPanel";
import PaginationPanel from "../../components/tables/PaginationPanel";
import TableRegistry from "../../components/tables/TableRegistry";
import Table from "../../components/tables/Table";
import Page from "../../components/general/Page";

import {
    GroupPageProvider,
    useGroupPageContext,
} from "../../contexts/PageContext";
import { useState } from "react";

const GroupsPage = () => {
    const { page, setPage, pages } = useGroupPageContext();

    const columnNames = ["id", "name", "email", "phone", "identity"];

    return (
        <>
            <Page title="Groups">
                <>
                    <Table columnNames={columnNames}>
                        {pages.length != 0 &&
                            page.people?.length &&
                            page.people.map((person) => (
                                <TableRegistry
                                    columnNames={columnNames}
                                    key={person.id}
                                    data={person.toJSON()}
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

    return (
        <GroupPageProvider pages={groupPages} initialPage="group-1">
            <GroupsPage />
        </GroupPageProvider>
    );
};

export default GroupPageContainer;
