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
    this.description = data.description;
    this.init_date = data.init_date;
    this.finish_date = data.finish_date;
    this.group_id = data.group_id;
    this.group = data.group;
    this.id_video = data.id_video;
  }

  validateForPOST() {
    const errors = [];

    errors.push(
      ...this.validateRequiredFields(["name"]),
      ...this.validateStringFields(["name", "description"]),
      ...this.validateDateFields(["init_date", "finish_date"])
    );

    if (
      !errors.some((error) =>
        ["init_date", "finish_date"].includes(error.key)
      )
    ) {
      if (new Date(this.finish_date) < new Date(this.init_date)) {
        errors.push({
          key: "finish_date",
          msg: "Finish date must be after start date",
          value: this.finish_date,
        });
      }
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
