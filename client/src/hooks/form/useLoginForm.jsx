import { useState, useEffect } from "react";

import { ALERT_TYPES, emailRegex } from "../../types";

const useLoginForm = ({
    fetchLogin = () => {},
    loginResponse = {},
    formData,
    onSuccess = () => {},
}) => {
    const [alert, setAlert] = useState({});

    const validateForm = () => {
        const { email, password } = formData;

        if (Object.values(formData).includes("")) {
            const missingFields = [];
            if (email === "") missingFields.push("email");
            if (password === "") missingFields.push("password");

            const fieldsList = missingFields.join(" and ");
            return `The ${fieldsList} ${
                missingFields.length > 1 ? "are" : "is"
            } required.`;
        }

        if (!emailRegex.test(email)) return "The email address is not valid.";
    };

    const handleOnSubmit = () => {
        const errorText = validateForm();

        if (typeof errorText === "string")
            return setAlert({
                type: ALERT_TYPES.ERROR,
                text: errorText,
            });

        fetchLogin(formData.email, formData.password);
    };

    useEffect(() => {
        // console.log(loginResponse)
        if (Object.keys(loginResponse).length === 0) return;

        if (!loginResponse.token)
            return setAlert({
                type: ALERT_TYPES.ERROR,
                text: "The password is incorrect.",
            });

        setAlert({
            type: ALERT_TYPES.SUCCESS,
            text: `The user ${
                loginResponse?.user?.name.split(" ")[0]
            } has been logged in successfully.`,
        });

        onSuccess();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginResponse]);

    return {
        alert,
        setAlert,
        handleOnSubmit,
    };
};

export default useLoginForm;
