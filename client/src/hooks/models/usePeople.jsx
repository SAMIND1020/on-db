import useAPIGet from "../api/useAPIGet";
import useAPIPost from "../api/useAPIPost";
import Person from "../../models/Person";

const useGetPeople = (options = {}) => {
    const { data, loading, error, getData } = useAPIGet({
        endpoint: "/people",
        parser: (res) => (res.people || []).map((p) => new Person(p)),
        ...options,
    });

    return { people: data, loading, error, getData };
};

const usePostPerson = (options = {}) => {
    const { data, loading, error, postData } = useAPIPost({
        endpoint: "/people",
        ...options,
    });

    return { postResponse: data, loading, error, postData };
};

export { useGetPeople, usePostPerson };
