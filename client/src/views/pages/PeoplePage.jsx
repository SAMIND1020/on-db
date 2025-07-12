import { useState } from "react";

import PaginationPanel from "../../components/tables/PaginationPanel";
import TableRegistry from "../../components/tables/TableRegistry";
import Table from "../../components/tables/Table";
import Page from "../../components/general/Page";
import Button from "../../components/general/Button";

import PersonModal from "../modals/PersonModal";
import CreatePersonModal from "../modals/CreatePersonModal";

import { useGetPeople } from "../../hooks/models/usePeople";

const PeoplePage = () => {
    const [activeModal, setActiveModal] = useState();
    const [personInfo, setPersonInfo] = useState({});
    const [paginationPage, setPaginationPage] = useState(1);

    const { people } = useGetPeople({ page: paginationPage });

    const handleModal = (type, info = {}) => {
        if (!type) {
            setActiveModal(null);
            setPersonInfo({});
            return;
        }

        setPersonInfo(info);
        setActiveModal(type);
    };

    const onClickViewMore = (data) => {
        handleModal("info", data);
    };

    const columnNames = ["id", "name", "email", "phone", "identity"];
    const actionButton = {
        name: "view_more",
        onClick: onClickViewMore,
        icon: "keyboard_double_arrow_right",
    };

    const onChangePage = (page) => {
        if (page < 1) return;

        setPaginationPage(page);
    };

    return (
        <>
            <Page
                title="People"
                actionButtons={
                    <Button
                        onClick={() =>
                            activeModal === "create"
                                ? handleModal(null)
                                : handleModal("create")
                        }
                    >
                        {activeModal === "create" ? "Close" : "New Person"}
                    </Button>
                }
            >
                <Table columnNames={[...columnNames, actionButton.name]}>
                    {people.map((person) => (
                        <TableRegistry
                            columnNames={columnNames}
                            key={person.id}
                            data={person.toJSON()}
                            actionButton={actionButton}
                        />
                    ))}
                </Table>
                <PaginationPanel
                    page={paginationPage}
                    onChangePage={onChangePage}
                />
            </Page>
            {activeModal === "create" && <CreatePersonModal />}
            {activeModal === "info" && Object.keys(personInfo).length != 0 && (
                <PersonModal
                    personInfo={personInfo}
                    setPersonInfo={() => handleModal(null)}
                />
            )}
        </>
    );
};

export default PeoplePage;
