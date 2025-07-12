/* eslint-disable react/prop-types */
import Page from "../../components/general/Page";
import Button from "../../components/general/Button";

const EventModal = ({ eventInfo = {}, setEventInfo = () => {} }) => {
    return (
        <Page
            titleMarginl={false}
            title={eventInfo.name}
            actionButtons={
                <Button onClick={() => setEventInfo({})}>Close</Button>
            }
        >
            <div className="w-[320px]">
                <p className="px-4 mb-6 text-selected-dark dark:text-selected text-sm font-normal leading-normal">
                    {eventInfo.description}
                </p>
                <p className="px-4 flex items-center w-fit dark:text-secondary">
                    <span className="material-icons-outlined -mr-4">
                        events
                    </span>
                    {new Date(eventInfo.init_date).toLocaleDateString("en")}
                    <span className="material-icons-outlined -ml-[140px]">
                        arrow forward
                    </span>
                    <span className="material-icons-outlined -mr-4">
                        events
                    </span>
                    {new Date(eventInfo.finish_date).toLocaleDateString("en")}
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

export default EventModal;
