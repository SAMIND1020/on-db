import { useState } from "react";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";
import FormMap from "../../components/form/FormMap";

import { INPUT_TYPES, ID_TYPE_TYPES, MARITAL_STATUS_TYPES } from "../../types";

const GROUPS_VALUES = [];
const SERVICES_VALUES = [];
const INFLUENCER_VALUES = [];

const CreatePersonModal = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        identity: "",
        address_lat: 0,
        address_lon: 0,
        id_type: ID_TYPE_TYPES[0].value,
        family: "",
        marital_status: MARITAL_STATUS_TYPES[0],
        influencer: "",
        groups: [],
        services: [],
    });

    const handleInputChange = (value, key) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    return (
        <div className="mix-w-[400px] h-full">
            <Form
                onSubmit={() => {}}
                title="Create new person"
                description="Use this form to create a new person in your database"
                pages={3}
            >
                <div>
                    <FormInput
                        value={formData.name}
                        type={INPUT_TYPES.TEXT}
                        label="Name"
                        placeholder="John"
                        onChange={(value) => handleInputChange(value, "name")}
                    />
                    <FormInput
                        value={formData.email}
                        type={INPUT_TYPES.TEXT}
                        label="Email"
                        placeholder="john@gmail.com"
                        onChange={(value) => handleInputChange(value, "email")}
                    />
                    <FormInput
                        value={formData.identity}
                        type={INPUT_TYPES.TEXT}
                        label="Identity"
                        placeholder="9.854.4332"
                        onChange={(value) =>
                            handleInputChange(value, "identity")
                        }
                    />
                    <FormInput
                        value={formData.phone}
                        type={INPUT_TYPES.TEXT}
                        label="Phone"
                        placeholder="(+57) 300 7890876"
                        onChange={(value) => handleInputChange(value, "phone")}
                    />
                    <FormInput
                        value={formData.family}
                        type={INPUT_TYPES.TEXT}
                        label="Family"
                        placeholder="Anthony Virgil"
                        onChange={(value) => handleInputChange(value, "family")}
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
                    />
                    <FormInput
                        value={formData.marital_status}
                        type={INPUT_TYPES.SELECT}
                        values={MARITAL_STATUS_TYPES}
                        label="Marital Status"
                        onChange={(value) =>
                            handleInputChange(value, "marital_status")
                        }
                    />
                    <FormMap
                        label="Address"
                        onChange={({ latlng: { lat, lng } }) => {
                            handleInputChange(lat, "address_lat");
                            handleInputChange(lng, "address_lon");
                        }}
                    />
                </div>

                <div>
                    <FormInput
                        value={formData.groups}
                        type={INPUT_TYPES.CHECKBOXES}
                        values={GROUPS_VALUES}
                        label="Groups"
                        onChange={(value) => handleInputChange(value, "groups")}
                    />
                    <FormInput
                        value={formData.services}
                        type={INPUT_TYPES.CHECKBOXES}
                        values={SERVICES_VALUES}
                        label="Services"
                        onChange={(value) =>
                            handleInputChange(value, "services")
                        }
                    />
                    <FormInput
                        value={formData.influencer}
                        type={INPUT_TYPES.SELECT}
                        values={INFLUENCER_VALUES}
                        label="Influencer"
                        onChange={(value) =>
                            handleInputChange(value, "influencer")
                        }
                    />
                </div>
            </Form>
        </div>
    );
};

export default CreatePersonModal;
