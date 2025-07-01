import useAPIGet from "../api/useAPIGet";
import Person from "../../models/Person";

const useGetPeople = (options = {}) => {
    const {data, api} = useAPIGet({
        endpoint: "/people",
        parser: (res) => (res.people || []).map((p) => new Person(p)),
        ...options,
    });

    return { people: data, ...api };
};

export { useGetPeople };
