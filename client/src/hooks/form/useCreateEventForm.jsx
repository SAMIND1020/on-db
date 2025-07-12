import { useEffect, useState } from "react";

import { ALERT_TYPES } from "../../types";

import Event from "../../models/Event";

const useCreateEventForm = ({
    formData,
    onSuccess = () => {},
    postData = () => {},
    postResponse = {},
}) => {
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({});

    const handleOnSubmit = () => {
        const event = new Event(formData);
        const { errors: _errors } = event.validateForPOST();

        if (_errors.length !== 0) {
            const newErrors = _errors.reduce((acc, error) => {
                acc[error.key] = {
                    type: ALERT_TYPES.ERROR,
                    text: error.msg,
                };
                return acc;
            }, {});

            return setErrors(newErrors);
        }

        setErrors({});
        postData(event.toPOST());
    };

    useEffect(() => {
        // console.log(postResponse);
        if (Object.keys(postResponse).length === 0) return;

        if (!postResponse.headers.ok || postResponse.headers.status != 201) {
            const newErrors = postResponse.errors.reduce((acc, error) => {
                acc[error.path] = {
                    type: ALERT_TYPES.ERROR,
                    text: error.msg,
                };
                return acc;
            }, {});

            return setErrors(newErrors);
        }

        if (!postResponse?.event?.id) return;

        setAlert({
            type: ALERT_TYPES.SUCCESS,
            text: `The event ${postResponse?.event?.name.split(" ")[0]}
            has been created in successfully.`,
        });

        onSuccess({ setAlert });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postResponse]);

    return {
        errors,
        setErrors,
        handleOnSubmit,
        alert,
    };
};

export default useCreateEventForm;
