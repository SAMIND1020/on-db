import { useEffect, useState } from "react";

import { ALERT_TYPES } from "../../types";

import { createPersonModalPages as pages } from "../../types/pages";
import { getFirstErrorPageIndex } from "../../helpers";

import Person from "../../models/Person";

const useLoginForm = ({
    formData,
    onSuccess = () => {},
    postData = () => {},
    postResponse = {},
}) => {
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({});
    const [changePageFn, setChangePageFn] = useState(() => {});

    const handleOnSubmit = ({ changePage }) => {
        setChangePageFn(() => changePage);
        const person = new Person(formData);
        const { errors: _errors } = person.validateForPOST();

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
        postData(person.toPOST());
    };

    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            const firstErrorPage = getFirstErrorPageIndex(errors, pages);

            changePageFn(firstErrorPage + 1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

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

        setAlert({
            type: ALERT_TYPES.SUCCESS,
            text: `The person ${postResponse?.person?.name.split(" ")[0]}
            has been created in successfully.`,
        });

        onSuccess({ setAlert, setChangePageFn });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postResponse]);

    return {
        errors,
        setErrors,
        handleOnSubmit,
        alert,
    };
};

export default useLoginForm;
