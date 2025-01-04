import { useState } from "react";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";
import Modal from "../../components/general/Modal";

import { INPUT_TYPES } from "../../types";

const CreateModal = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (value, key) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    return (
        <Modal>
            <Form
                onSubmit={() => {}}
                title="Login"
                description="Use this form to login in your database"
                pages={1}
                submitButtonText="Login"
            >
                <FormInput
                    value={formData.email}
                    type={INPUT_TYPES.TEXT}
                    label="Email"
                    placeholder=""
                    onChange={(value) => handleInputChange(value, "email")}
                />
                <FormInput
                    value={formData.password}
                    type={INPUT_TYPES.TEXT}
                    label="Password"
                    placeholder=""
                    onChange={(value) => handleInputChange(value, "password")}
                />
            </Form>
        </Modal>
    );
};

export default CreateModal;
