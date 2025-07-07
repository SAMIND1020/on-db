export default class Person {
    constructor({
        id,
        name,
        description,
        init_date,
        finish_date,
        created_at,
        updated_at,
        group_id,
        group,
        id_video,
        createdAt,
        updatedAt,
    } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.init_date = init_date;
        this.finish_date = finish_date;
        this.created_at = createdAt || created_at;
        this.updated_at = updatedAt || updated_at;
        this.group_id = group_id;
        this.group = group;
        this.id_video = id_video;
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
