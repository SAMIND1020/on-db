import { useState } from "react";

import PaginationPanel from "../../components/tables/PaginationPanel";
import TableRegistry from "../../components/tables/TableRegistry";
import Table from "../../components/tables/Table";
import Page from "../../components/general/Page";
import Button from "../../components/general/Button";
import CreatePersonModal from "../modals/CreatePersonModal";

import { useGetPeople } from "../../hooks/models/usePeople";

const PeoplePage = () => {
    const [createPersonModal, setCreatePersonModal] = useState(true);

    const { people } = useGetPeople();

    const columnNames = ["id", "name", "email", "phone", "identity"];

    return (
        <>
            <Page
                title="People"
                actionButtons={
                    <Button onClick={() => setCreatePersonModal((c) => !c)}>
                        {!createPersonModal ? "New Person" : "Close"}
                    </Button>
                }
            >
                <Table columnNames={columnNames}>
                    {people.map((person) => (
                        <TableRegistry
                            columnNames={columnNames}
                            key={person.id}
                            data={person.toJSON()}
                        />
                    ))}
                </Table>
                <PaginationPanel />
            </Page>
            {createPersonModal && <CreatePersonModal />}
        </>
    );
};

export default PeoplePage;
