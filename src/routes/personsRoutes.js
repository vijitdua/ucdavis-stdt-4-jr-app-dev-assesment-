import {Router} from 'express';
import {getPersonsController} from "../controller/personsController.js";
const router = Router();

router.get('/', getPersonsController);
router.get('/:id', getPersonsController);

export default router;