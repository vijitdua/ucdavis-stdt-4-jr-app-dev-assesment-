import {Router} from 'express';
import {
    deletePersonController,
    getPersonsController,
    postPersonController,
    updatePersonController
} from "../controller/personsController.js";
import {
    getQuerySchema,
    postBodySchema,
    putBodySchema,
} from "../schemas/personSchemas.js";
import {validate} from "../middleware/jsonSchemaValidationMiddleware.js";
const router = Router();

router.get('/', validate(getQuerySchema, 'query'), getPersonsController);
router.get('/:id', getPersonsController);
router.post('/', validate(postBodySchema, 'body'), postPersonController);
router.put('/:id', validate(putBodySchema, 'body'), updatePersonController);
router.delete('/:id', deletePersonController);

export default router;