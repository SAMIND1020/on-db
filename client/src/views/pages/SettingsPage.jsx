import { useState } from "react";

import Page from "../../components/general/Page";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";

import { useTheme } from "../../contexts/ThemeContext";

import { INPUT_TYPES, ROLES_TYPES, THEME_TYPES } from "../../types";

const SettingsPage = () => {
    const { theme, setTheme } = useTheme();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rol: "",
    });

    const handleInputChange = (value, key) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    return (
        <Page title="Settings">
            <FormInput
                value={theme}
                type={INPUT_TYPES.SELECT}
                values={Object.values(THEME_TYPES)}
                label="Theme"
                onChange={setTheme}
            />
            <div className="flex">
                <Form title="Edit Profile" titleSmall>
                    <FormInput
                        type={INPUT_TYPES.TEXT}
                        placeholder="John"
                        label="Name"
                        value={formData.name}
                        onChange={(value) => handleInputChange(value, "name")}
                    />
                    <FormInput
                        type={INPUT_TYPES.TEXT}
                        placeholder="john@gmail.com"
                        label="Email"
                        value={formData.email}
                        onChange={(value) => handleInputChange(value, "email")}
                    />
                    <FormInput
                        value={formData.rol}
                        type={INPUT_TYPES.SELECT}
                        values={Object.values(ROLES_TYPES)}
                        label="Rol"
                        onChange={(value) => handleInputChange(value, "rol")}
                    />
                </Form>
            </div>
        </Page>
    );
};
export default SettingsPage;
