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

    validateForPOST() {
        const errors = [];

        const { name, description, init_date, finish_date } = this;

        const stringFields = {
            name,
            description,
        };
        const dateFields = { init_date, finish_date };
        const requiredFields = { name };

        Object.entries(requiredFields).forEach(([key, value]) => {
            if (value === "")
                errors.push({
                    key,
                    msg: `The ${key} must have a value`,
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

        Object.entries(dateFields).forEach(([key, value]) => {
            if (
                !(new Date(value) instanceof Date) ||
                isNaN(new Date(value)?.getTime())
            )
                errors.push({
                    key,
                    msg: `The ${key} must be a valid date`,
                    value,
                });
        });

        if (
            !errors.some((error) =>
                ["init_date", "finish_date"].includes(error.key)
            )
        ) {
            if (new Date(finish_date) < new Date(init_date))
                errors.push({
                    key: "finish_date",
                    msg: "Finish date must be after start date",
                    value: finish_date,
                });
        }

        return { errors };
    }

    toPOST() {
        return {
            name: this.name,
            description: this.description,
            init_date: new Date(this.init_date).toISOString(),
            finish_date: new Date(this.finish_date).toISOString(),
        };
    }
}
