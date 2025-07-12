export default class BaseModel {
    constructor(raw = {}) {
        this.id = raw.id;
        this.created_at = raw.createdAt ?? raw.created_at ?? null;
        this.updated_at = raw.updatedAt ?? raw.updated_at ?? null;
    }

    toJSON() {
        return { ...this };
    }

    getProperties() {
        return Object.keys(this);
    }

    validateRequiredFields(fields = []) {
        const errors = [];

        fields.forEach((key) => {
            const value = this[key];
            if (value === "" || value === null || value === undefined) {
                errors.push({
                    key,
                    msg: `The ${key} is required`,
                    value,
                });
            }
        });

        return errors;
    }

    validateNumericFields(fields = []) {
        const errors = [];

        fields.forEach((key) => {
            const value = this[key];
            if (
                !["string", "number"].includes(typeof value) ||
                isNaN(Number(value))
            ) {
                errors.push({
                    key,
                    msg: `The ${key} must be a number`,
                    value,
                });
            }
        });

        return errors;
    }

    validateStringFields(fields = []) {
        const errors = [];

        fields.forEach((key) => {
            const value = this[key];
            if (typeof value !== "string") {
                errors.push({
                    key,
                    msg: `The ${key} must be a string`,
                    value,
                });
            }
        });

        return errors;
    }

    validateDateFields(fields = []) {
        const errors = [];

        fields.forEach((key) => {
            const value = this[key];
            const date = new Date(value);
            if (!(date instanceof Date) || isNaN(date.getTime())) {
                errors.push({
                    key,
                    msg: `The ${key} must be a valid date`,
                    value,
                });
            }
        });

        return errors;
    }
}
