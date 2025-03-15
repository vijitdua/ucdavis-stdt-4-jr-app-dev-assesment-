import {Router} from 'express';
import {
    deletePersonController,
    getPersonsController,
    postPersonController,
    updatePersonController
} from "../controller/personsController.js";
const router = Router();

router.get('/', getPersonsController);
router.get('/:id', getPersonsController);
router.post('/', postPersonController);
router.put('/:id', updatePersonController);
router.delete('/:id', deletePersonController);

export default router;