/* eslint-disable react/prop-types */
import Page from "../../components/general/Page";
import Button from "../../components/general/Button";

import { capitalizeWithSpaces } from "../../helpers";

const PersonModal = ({ personInfo = {}, setPersonInfo = () => {} }) => {
    return (
        <Page
            titleMarginl={false}
            title={personInfo.name}
            actionButtons={
                <Button onClick={() => setPersonInfo({})}>Close</Button>
            }
        >
            <div className="w-[320px]">
                {Object.entries(personInfo)
                    .filter(([k]) =>
                        [
                            "id",
                            "email",
                            "phone",
                            "identity",
                            "marital_status",
                        ].includes(k)
                    )
                    .map(([k, v], i) => (
                        <p
                            className="px-4 mb-2 text-selected-dark dark:text-selected text-sm font-normal leading-normal"
                            key={i}
                        >
                            <span className="font-semibold">
                                {capitalizeWithSpaces(k)}:{" "}
                            </span>
                            {typeof v !== "string"
                                ? v
                                : capitalizeWithSpaces(v)}
                        </p>
                    ))}
                <p className="px-4 flex items-center w-fit dark:text-secondary text-sm leading-normal">
                    Created At:{" "}
                    <span className="material-icons-outlined ml-1 -mr-4">
                        events
                    </span>
                    {new Date(personInfo.created_at).toLocaleDateString("en")}
                </p>

                <div className="flex justify-between mt-5">
                    <div></div>
                    <div className="flex flex-row gap-2">
                        <Button onClick={() => {}} icon>
                            edit
                        </Button>
                        <Button onClick={() => {}} icon>
                            delete
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default PersonModal;
