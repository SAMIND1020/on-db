import BaseModel from "./BaseModel";

export default class Event extends BaseModel {
    constructor(raw = {}) {
        const data = {
            ...raw,
            created_at: raw.createdAt ?? raw.created_at,
            updated_at: raw.updatedAt ?? raw.updated_at,
        };

        super(data);

        this.name = data.name;
        this.email = data.email;
        this.rol = data.rol;
    }
}
