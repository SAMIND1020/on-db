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
        influencer_id,
        influencer,
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
        this.influencer_id = influencer_id;
        this.influencer = influencer;
        this.created_at = created_at;
        this.updated_at = updated_at;
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
}
