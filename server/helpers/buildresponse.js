const { Model: SequelizeModel } = require("sequelize");

function buildResponse(data, options = {}) {
    const {
        dataName = "data",
        renamedFields = {},
        customFields = {},
        excludedFields = [],
        msg,
    } = options;

    const response = { ...customFields };

    if (msg) {
        response.msg = msg;
    }

    const transformedData = Array.isArray(data)
        ? data.map(item => transformObject(
            item instanceof SequelizeModel
                ? item.toJSON() : item, renamedFields, excludedFields))
        : transformObject(
            data instanceof SequelizeModel
                ? data.toJSON() : data, renamedFields, excludedFields);

    response[dataName] = transformedData;
    return response;
}

function transformObject(obj, renamedFields, excludedFields) {
    const newObj = {};

    for (const key in obj) {
        const newKey = renamedFields[key] || key;

        if (!isFieldExcluded(key, excludedFields)) {
            const value = obj[key];

            if (typeof value === 'object' && !Array.isArray(value) && value) {
                newObj[newKey] = transformObject(
                    value, {}, getNestedExcludedFields(key, excludedFields));
            } else if (Array.isArray(value)) {
                newObj[newKey] = value.map(item => transformObject(
                    item, {}, getNestedExcludedFields(key, excludedFields)));
            } else {
                newObj[newKey] = value;
            }
        }
    }

    return newObj;
}

function isFieldExcluded(key, excludedFields) {
    return excludedFields.some(field => {
        const parts = field.split('.');
        return parts[0] === key && parts.length === 1;
    });
}

function getNestedExcludedFields(parentKey, excludedFields) {
    return excludedFields
        .filter(field => field.startsWith(`${parentKey}.`))
        .map(field => field.substring(parentKey.length + 1));
}

module.exports = buildResponse