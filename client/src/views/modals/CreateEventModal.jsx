import { useState } from "react";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";

import { INPUT_TYPES } from "../../types";

const CreateEventModal = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        init_date: new Date().toISOString().split("T")[0],
        finish_date: new Date().toISOString().split("T")[0],
    });

    const handleInputChange = (value, key) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    return (
        <div className="mix-w-[400px] h-full">
            <Form
                onSubmit={() => {}}
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
                />
                <FormInput
                    value={formData.description}
                    type={INPUT_TYPES.TEXT}
                    label="Description"
                    placeholder="Cupidatat qui tempor nisi esse ex."
                    onChange={(value) =>
                        handleInputChange(value, "description")
                    }
                />
                <FormInput
                    value={formData.init_date}
                    type={INPUT_TYPES.DATE}
                    label="Init Date"
                    onChange={(value) => handleInputChange(value, "init_date")}
                />
                <FormInput
                    value={formData.finish_date}
                    type={INPUT_TYPES.DATE}
                    label="Finish Date"
                    onChange={(value) =>
                        handleInputChange(value, "finish_date")
                    }
                />
            </Form>
        </div>
    );
};

export default CreateEventModal;
