import {Ajv} from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ coerceTypes: true });
addFormats(ajv);

export function validate(schema, target = "body"){
    const validateFunction = ajv.compile(schema);

    return (req, res, next) => {
        const data = req[target];
        const valid = validateFunction(data);

        if (!valid) {
            return res.status(400).json({
                error: "Validation failed",
                details: validateFunction.errors
            });
        }

        next();
    };
}