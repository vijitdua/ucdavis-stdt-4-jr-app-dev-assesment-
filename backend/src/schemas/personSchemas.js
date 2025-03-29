export const getQuerySchema = {
    type: 'object',
    properties: {
        limit: {type: 'integer', minimum: 1},
        skip: {type: 'integer'},
    },
    required: ['limit', 'skip'],
    additionalProperties: false,
};

export const postBodySchema = {
    type: 'object',
    properties: {
        First_Name: {type: 'string'},
        Last_Name: {type: 'string'},
        Email: {type: 'string', format: 'email'},
        Salary: {type: 'number'},
    },
    required: ['First_Name', 'Last_Name', 'Email', 'Salary'],
}

export const putBodySchema = {
    type: 'object',
    properties: {
        Id: {type: 'string'},
        First_Name: { type: 'string', minLength: 1 },
        Last_Name: { type: 'string', minLength: 1 },
        Email: { type: 'string', format: 'email'},
        Salary: { type: 'number' }
    },
    additionalProperties: false,
    minProperties: 1
};
