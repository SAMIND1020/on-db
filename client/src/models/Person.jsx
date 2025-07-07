import { emailRegex, phoneRegex } from "../helpers";

import { ID_TYPE_TYPES, MARITAL_STATUS_TYPES } from "../types";

export default class Person {
    constructor({
        id,
        name,
        email,
        phone,
        identity,
        address_lat,
        address_lon,
        id_type,
        family,
        marital_status,
        influencerId,
        influencer_id,
        createdAt,
        updatedAt,
        groups,
        services,
        created_at,
        updated_at,
    } = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.identity = identity;
        this.address_lat = address_lat;
        this.address_lon = address_lon;
        this.id_type = id_type;
        this.family = family;
        this.marital_status = marital_status;
        this.groups = groups;
        this.services = services;
        this.influencer_id = influencerId || influencer_id;
        this.created_at = createdAt || created_at;
        this.updated_at = updatedAt || updated_at;
    }

    toString() {
        return `Name: ${this.name}\nEmail: ${this.email}\nTeléfono: ${this.phone}\n...`;
    }

    toJSON() {
        return { ...this };
    }

    getProperties() {
        return Object.getOwnPropertyNames(this);
    }

    validateForPOST() {
        const errors = [];

        const {
            name,
            email,
            phone,
            identity,
            address_lat,
            address_lon,
            id_type,
            family,
            marital_status,
            influencer_id,
        } = this;

        const numericFields = {
            phone,
            identity,
            influencer_id,
            address_lat,
            address_lon,
        };
        const stringFields = {
            name,
            email,
            id_type,
            family,
            marital_status,
        };
        const requiredFields = { name, email, phone, identity };

        Object.entries(requiredFields).forEach(([key, value]) => {
            if (value === "")
                errors.push({
                    key,
                    msg: `The ${key} must have a value`,
                    value,
                });
        });

        Object.entries(numericFields).forEach(([key, value]) => {
            if (
                !["string", "number"].includes(typeof value) ||
                isNaN(Number(value))
            )
                errors.push({
                    key,
                    msg: `The ${key} must be a number`,
                    value,
                });
        });

        Object.entries(stringFields).forEach(([key, value]) => {
            typeof value !== "string" &&
                errors.push({
                    key,
                    msg: `The ${key} must be a string`,
                    value,
                });
        });

        if (!emailRegex.test(email))
            errors.push({
                key: "email",
                msg: "The email is not valid",
                value: email,
            });

        if (!phoneRegex.test(phone))
            errors.push({
                key: "phone",
                msg: "The phone is not valid",
                value: phone,
            });

        if (!ID_TYPE_TYPES.some(({ value }) => value === id_type))
            errors.push({
                key: "id_type",
                msg: "The id type is not valid",
                value: id_type,
            });

        if (!MARITAL_STATUS_TYPES.includes(marital_status))
            errors.push({
                key: "marital_status",
                msg: "The marital status is not valid",
                value: marital_status,
            });

        if (
            errors.some((error) =>
                ["address_lat", "address_lon"].includes(error.key)
            )
        )
            errors.push({
                key: "address",
                msg: "The address is not valid",
                value: { address_lat, address_lon },
            });

        return { errors };
    }

    toPOST() {
        return {
            name: this.name,
            email: this.email,
            phone: this.phone,
            identity: this.identity,
            address_lat: this.address_lat,
            address_lon: this.address_lon,
            id_type: this.id_type,
            family: this.family,
            marital_status: this.marital_status,
            influencer_id: this.influencer_id,
        };
    }
}
