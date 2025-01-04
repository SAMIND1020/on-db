import { useEffect, useState } from "react";

import PaginationPanel from "../../components/tables/PaginationPanel";
import TableRegistry from "../../components/tables/TableRegistry";
import Table from "../../components/tables/Table";
import Page from "../../components/general/Page";
import Button from "../../components/general/Button";
import CreatePersonModal from "../modals/CreatePersonModal";

const PeoplePage = () => {
    const [createPersonModal, setCreatePersonModal] = useState(false);
    const [persons, setPersons] = useState([]);

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
                    {persons.map((person) => (
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
