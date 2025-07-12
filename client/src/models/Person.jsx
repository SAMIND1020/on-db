import BaseModel from "./BaseModel";
import { emailRegex, phoneRegex } from "../helpers";
import { ID_TYPE_TYPES, MARITAL_STATUS_TYPES } from "../types";

export default class Person extends BaseModel {
  constructor(raw = {}) {
    const data = {
      ...raw,
      influencer_id: raw.influencerId ?? raw.influencer_id,
      created_at: raw.createdAt ?? raw.created_at,
      updated_at: raw.updatedAt ?? raw.updated_at,
    };

    super(data);

    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.identity = data.identity;
    this.address_lat = data.address_lat;
    this.address_lon = data.address_lon;
    this.id_type = data.id_type;
    this.family = data.family;
    this.marital_status = data.marital_status;
    this.influencer_id = data.influencer_id;
    this.groups = data.groups;
    this.services = data.services;
  }

  validateForPOST() {
    const errors = [];

    errors.push(
      ...this.validateRequiredFields([
        "name",
        "email",
        "phone",
        "identity",
      ]),
      ...this.validateNumericFields([
        "phone",
        "identity",
        "influencer_id",
        "address_lat",
        "address_lon",
      ]),
      ...this.validateStringFields([
        "name",
        "email",
        "id_type",
        "family",
        "marital_status",
      ])
    );

    if (!emailRegex.test(this.email)) {
      errors.push({
        key: "email",
        msg: "The email is not valid",
        value: this.email,
      });
    }

    if (!phoneRegex.test(this.phone)) {
      errors.push({
        key: "phone",
        msg: "The phone is not valid",
        value: this.phone,
      });
    }

    if (!ID_TYPE_TYPES.some(({ value }) => value === this.id_type)) {
      errors.push({
        key: "id_type",
        msg: "The id type is not valid",
        value: this.id_type,
      });
    }

    if (!MARITAL_STATUS_TYPES.includes(this.marital_status)) {
      errors.push({
        key: "marital_status",
        msg: "The marital status is not valid",
        value: this.marital_status,
      });
    }

    if (
      errors.some((e) =>
        ["address_lat", "address_lon"].includes(e.key)
      )
    ) {
      errors.push({
        key: "address",
        msg: "The address is not valid",
        value: {
          address_lat: this.address_lat,
          address_lon: this.address_lon,
        },
      });
    }

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
