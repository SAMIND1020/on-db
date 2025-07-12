import { useState } from "react";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";
import Alert from "../../components/general/Alert";

import useCreateEventForm from "../../hooks/form/useCreateEventForm";

import { useGetGroups } from "../../hooks/models/useGroups";
import { usePostEvent } from "../../hooks/models/useEvents";

import { useGlobalPageContext } from "../../contexts/PageContext";

import { INPUT_TYPES } from "../../types";

const defaultFormValues = {
    name: "",
    description: "",
    init_date: new Date().toISOString().split("T")[0],
    finish_date: new Date().toISOString().split("T")[0],
    group_id: undefined,
};

const CreateEventModal = () => {
    const [formData, setFormData] = useState(defaultFormValues);
    const [groupsValues, setGroupsValues] = useState([]);

    const onLoadGroups = (groups) => {
        setGroupsValues([
            {
                label: "General Event",
                value: undefined,
            },
            ...groups.map((i) => ({
                label: i.name,
                value: i.id,
            })),
        ]);
    };

    useGetGroups({ onLoad: onLoadGroups });

    const { setPage } = useGlobalPageContext();

    const onSuccess = ({ setAlert }) => {
        setPage("events");
        setTimeout(() => {
            setFormData(defaultFormValues);

            setAlert({});
            window.location.reload();
        }, 1500);
    };

    const { postData, postResponse } = usePostEvent({
        group_id: formData.group_id,
    });
    const { errors, handleOnSubmit, alert } = useCreateEventForm({
        formData,
        postData,
        postResponse,
        onSuccess,
    });

    const handleInputChange = (value, key) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    return (
        <div className="mix-w-[400px] h-full">
            <Form
                onSubmit={handleOnSubmit}
                title="Create new event"
                description="Use this form to create a new event in your database"
                pages={1}
            >
                <FormInput
                    value={formData.name}
                    type={INPUT_TYPES.TEXT}
                    label="Name"
                    placeholder="Fest"
                    onChange={(value) => handleInputChange(value, "name")}
                    alert={errors.name}
                />
                <FormInput
                    value={formData.description}
                    type={INPUT_TYPES.TEXT}
                    label="Description"
                    placeholder="Cupidatat qui tempor nisi esse ex."
                    onChange={(value) =>
                        handleInputChange(value, "description")
                    }
                    alert={errors.description}
                />
                <FormInput
                    value={formData.init_date}
                    type={INPUT_TYPES.DATE}
                    label="Init Date"
                    onChange={(value) => handleInputChange(value, "init_date")}
                    alert={errors.init_date}
                />
                <FormInput
                    value={formData.finish_date}
                    type={INPUT_TYPES.DATE}
                    label="Finish Date"
                    onChange={(value) =>
                        handleInputChange(value, "finish_date")
                    }
                    alert={errors.finish_date}
                />
                <FormInput
                    value={formData.group_id}
                    type={INPUT_TYPES.SELECT}
                    values={groupsValues}
                    label="Group"
                    onChange={(value) => handleInputChange(value, "group_id")}
                    alert={errors.group_id}
                />
                <div className="mt-2 p-2">
                    {Object.keys(alert).length != 0 && (
                        <Alert type={alert.type}>{alert.text}</Alert>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default CreateEventModal;
