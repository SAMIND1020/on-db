import { useEffect, useState } from "react";

import { useServerContext } from "../../contexts/ServerContext";

const useGetPeople = ({ onLoadPage = () => {} }) => {
    const { api } = useServerContext();

    const [getPeopleResponse, setGetPeopleResponse] = useState({});

    useEffect(() => {
        if (Object.keys(getPeopleResponse).length === 0) {
            fetchGetPeople();
            return;
        }

        if (
            Object.keys(getPeopleResponse).length !== 0 &&
            getPeopleResponse?.people
        ) {
            onLoadPage(getPeopleResponse?.people);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getPeopleResponse]);

    const fetchGetPeople = async () => {
        const res = await api.get("/people?page=1", undefined, {
            validateToken: true,
        });

        setGetPeopleResponse(res);
        return res;
    };

    return { getPeopleResponse, fetchGetPeople };
};

export { useGetPeople };
