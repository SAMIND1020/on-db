import { useState } from "react";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";
import Modal from "../../components/general/Modal";
import Alert from "../../components/general/Alert";

import { useLogin } from "../../hooks/models/useAuth";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGlobalPageContext } from "../../contexts/PageContext";
import useLoginForm from "../../hooks/form/useLoginForm";

import { INPUT_TYPES } from "../../types";

const LoginModal = () => {
    const { setUser } = useAuthContext();
    const { setPage } = useGlobalPageContext();
    const { loginResponse, fetchLogin } = useLogin();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (value, key) =>
        setFormData((prevData) => ({ ...prevData, [key]: value }));

    const onSuccess = () => {
        setUser(loginResponse);

        setTimeout(() => {
            setFormData({
                email: "",
                password: "",
            });

            setAlert({});
            setPage("home");
        }, 1500);
    };

    const { handleOnSubmit, setAlert, alert } = useLoginForm({
        fetchLogin,
        loginResponse,
        formData,
        onSuccess,
    });

    return (
        <Modal>
            <Form
                onSubmit={handleOnSubmit}
                title="Login"
                description="Use this form to login in your database"
                pages={1}
                submitButtonText="Login"
            >
                <FormInput
                    value={formData.email}
                    type={INPUT_TYPES.EMAIL}
                    label="Email"
                    placeholder="Enter your email..."
                    onChange={(value) => handleInputChange(value, "email")}
                />
                <FormInput
                    value={formData.password}
                    type={INPUT_TYPES.PASSWORD}
                    label="Password"
                    placeholder="Enter your password..."
                    onChange={(value) => handleInputChange(value, "password")}
                />
            </Form>
            {Object.keys(alert).length != 0 && (
                <Alert type={alert.type}>{alert.text}</Alert>
            )}
        </Modal>
    );
};

export default LoginModal;
