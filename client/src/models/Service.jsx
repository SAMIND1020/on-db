export default class Service {
    constructor({
        id,
        name,
        description,
        created_at,
        updated_at,
        createdAt,
        updatedAt,
        members,
    } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.created_at = createdAt || created_at;
        this.updated_at = updatedAt || updated_at;
        this.members = members;
    }

    toString() {
        return `Name: ${this.name}\nDescription: ${this.description}\nInit Date: ${this.init_date}\nFinish Date: ${this.finish_date}\n...`;
    }

    toJSON() {
        return { ...this };
    }

    getProperties() {
        return Object.getOwnPropertyNames(this);
    }
}
