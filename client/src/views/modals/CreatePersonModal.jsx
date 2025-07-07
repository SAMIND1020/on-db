import { useState } from "react";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";
import FormMap from "../../components/form/FormMap";
import Alert from "../../components/general/Alert";

import useCreatePersonForm from "../../hooks/form/useCreatePersonForm";
import { useGetGroups } from "../../hooks/models/useGroups";
import { useGetServices } from "../../hooks/models/useServices";
import { useGetUsers } from "../../hooks/models/useUsers";
import { useGlobalPageContext } from "../../contexts/PageContext";

import { INPUT_TYPES, ID_TYPE_TYPES, MARITAL_STATUS_TYPES } from "../../types";

import { usePostPerson } from "../../hooks/models/usePeople";

const defaultFormData = {
    name: "Diego Agudelo",
    email: "dieagudeloaa@local.com",
    phone: "75078437",
    identity: "3007776096",
    address_lat: 4.60144993252414,
    address_lon: -74.12802815437318,
    id_type: ID_TYPE_TYPES[0].value,
    family: "Agudelo Angulo",
    marital_status: MARITAL_STATUS_TYPES[1],
    influencer_id: 0,
    groups: ["Hombres", "Parejas"],
    services: ["Ofrenda"],
};

// const defaultFormData = {
//     name: "",
//     email: "",
//     phone: "",
//     identity: "",
//     address_lat: 0,
//     address_lon: 0,
//     id_type: ID_TYPE_TYPES[0].value,
//     family: "",
//     marital_status: MARITAL_STATUS_TYPES[0],
//     influencer_id: 0,
//     groups: [],
//     services: [],
// };

const CreatePersonModal = () => {
    const [formData, setFormData] = useState(defaultFormData);

    const onLoadInfluencers = (res) => {
        const influencers = res.filter(({ rol }) => rol === "Influencer");
        if (influencers?.length !== 0)
            handleInputChange(influencers?.[0].id, "influencer_id");
    };

    const { groups: groupsValues } = useGetGroups();
    const { services: servicesValues } = useGetServices();
    const { users: influencersValues } = useGetUsers({
        onLoad: onLoadInfluencers,
    });

    const { setPage } = useGlobalPageContext();

    const onSuccess = ({ setAlert }) => {
        setPage("people");
        setTimeout(() => {
            setFormData(defaultFormData);

            setAlert({});
            window.location.reload();
        }, 1500);
    };

    const { postData, postResponse } = usePostPerson();
    const { errors, handleOnSubmit, alert } = useCreatePersonForm({
        formData,
        groupsData: groupsValues.filter(({ name }) =>
            formData.groups.includes(name)
        ),
        servicesData: servicesValues.filter(({ name }) =>
            formData.services.includes(name)
        ),
        postData,
        postResponse,
        onSuccess,
    });

    const handleInputChange = (value, key) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    return (
        <div className="mix-w-[400px] h-full">
            <Form
                onSubmit={handleOnSubmit}
                title="Create new person"
                description="Use this form to create a new person in your database"
                pages={3}
                initPage={3}
            >
                <div>
                    <FormInput
                        value={formData.name}
                        type={INPUT_TYPES.TEXT}
                        label="Name"
                        placeholder="John"
                        onChange={(value) => handleInputChange(value, "name")}
                        alert={errors.name}
                    />
                    <FormInput
                        value={formData.email}
                        type={INPUT_TYPES.TEXT}
                        label="Email"
                        placeholder="john@gmail.com"
                        onChange={(value) => handleInputChange(value, "email")}
                        alert={errors.email}
                    />
                    <FormInput
                        value={formData.identity}
                        type={INPUT_TYPES.TEXT}
                        label="Identity"
                        placeholder="9.854.4332"
                        onChange={(value) =>
                            handleInputChange(value, "identity")
                        }
                        alert={errors.identity}
                    />
                    <FormInput
                        value={formData.phone}
                        type={INPUT_TYPES.TEXT}
                        label="Phone"
                        placeholder="(+57) 300 7890876"
                        onChange={(value) => handleInputChange(value, "phone")}
                        alert={errors.phone}
                    />
                    <FormInput
                        value={formData.family}
                        type={INPUT_TYPES.TEXT}
                        label="Family"
                        placeholder="Anthony Virgil"
                        onChange={(value) => handleInputChange(value, "family")}
                        alert={errors.family}
                    />
                </div>

                <div>
                    <FormInput
                        value={formData.id_type}
                        type={INPUT_TYPES.SELECT}
                        values={ID_TYPE_TYPES}
                        label="Id Type"
                        onChange={(value) =>
                            handleInputChange(value, "id_type")
                        }
                        alert={errors.marital_status}
                    />
                    <FormInput
                        value={formData.marital_status}
                        type={INPUT_TYPES.SELECT}
                        values={MARITAL_STATUS_TYPES}
                        label="Marital Status"
                        onChange={(value) =>
                            handleInputChange(value, "marital_status")
                        }
                        alert={errors.marital_status}
                    />
                    <FormMap
                        value={{
                            lat: formData.address_lat,
                            lng: formData.address_lon,
                        }}
                        label="Address"
                        onChange={({ latlng: { lat, lng } }) => {
                            handleInputChange(lat, "address_lat");
                            handleInputChange(lng, "address_lon");
                        }}
                        alert={errors.address}
                    />
                </div>

                <div>
                    <FormInput
                        value={formData.groups}
                        type={INPUT_TYPES.CHECKBOXES}
                        values={groupsValues.map((g) => g.name)}
                        label="Groups"
                        onChange={(value) => handleInputChange(value, "groups")}
                        alert={errors.groups}
                    />
                    <FormInput
                        value={formData.services}
                        type={INPUT_TYPES.CHECKBOXES}
                        values={servicesValues.map((s) => s.name)}
                        label="Services"
                        onChange={(value) =>
                            handleInputChange(value, "services")
                        }
                        alert={errors.services}
                    />
                    <FormInput
                        value={formData.influencer_id}
                        type={INPUT_TYPES.SELECT}
                        values={influencersValues
                            .filter(({ rol }) => rol === "Influencer")
                            .map((i) => ({ label: i.name, value: i.id }))}
                        label="Influencer"
                        onChange={(value) =>
                            handleInputChange(value, "influencer_id")
                        }
                        alert={errors.influencer_id}
                    />
                    <div className="mt-4">
                        {Object.keys(alert).length != 0 && (
                            <Alert type={alert.type}>{alert.text}</Alert>
                        )}
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default CreatePersonModal;
