export default class Person {
    constructor({
        id,
        name,
        email,
        rol,
        created_at,
        updated_at,
    } = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rol = rol;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    toString() {
        return `Name: ${this.name}\nEmail: ${this.email}\nRol: ${this.rol}\n...`;
    }

    toJSON() {
        return { ...this };
    }

    getProperties() {
        return Object.getOwnPropertyNames(this);
    }
}
