import {addData, deletePersonById, getAllPersons, getPersonById, updatePerson} from "../services/personsService.js";
import { v4 as uuidv4 } from 'uuid';

/**
 * Handles person data response
 * @param {Object} req express request
 * @param {String} [req.params.id] id parameter for requested user data (optional)
 * @param {Object} res express response
 * @response {Object} res.json with appropriate error code or data of records (record with id or first 10 records if no id)
 */
export async function getPersonsController(req, res) {
    try{
        const requestedId = req.params?.id || null;
        const limit = req.query?.limit || 10;
        const skip = req.query?.skip || 0;

        try{
            if(requestedId){
                const returnData = await getPersonById(requestedId);
                return res.status(200).json(returnData);
            }
        }catch(error){
            return res.status(404).json({error: `Record with requested id doesn't exist`});
        }

        const returnData = await getAllPersons(limit, skip);

        return res.status(200).json(returnData);

    } catch(error){
        return res.status(500).json({error: error.message});
    }

}

/**
 * Handles adding a person
 * @param {Object} req express request
 * @param {String} req.body.First_Name First name
 * @param {String} req.body.Last_Name Last Name
 * @param {Number} req.body.Salary Salary
 * @param {String} req.body.Email Email
 * @param {Object} res express response
 * @response {Object} res.json with appropriate error code or success message with person Id
 */
export async function postPersonController(req, res) {
    try {
        const { First_Name, Last_Name, Email, Salary } = req.body;
        const newId = uuidv4();
        addData(newId, First_Name, Last_Name, Email, Salary);
        return res.status(201).json({ message: "Person added successfully", id: newId });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

/**
 * Handles updating an existing person
 * Atleast one req.body param is required but not all.
 * @param {String} req.params.id identifier of record to update
 * @param {Object} req express request
 * @param {String} [req.body.First_Name] First name
 * @param {String} [req.body.Last_Name] Last Name
 * @param {Number} [req.body.Salary] Salary
 * @param {String} [req.body.Email] Email
 * @param {Object} res express response
 * @response {Object} res.json with appropriate error code or success message with person Id
 */
export async function updatePersonController(req, res) {
    try {
        const { id } = req.params;
        const { First_Name, Last_Name, Email, Salary } = req.body;
        if(!id) return res.status(401).json({error: `id is required`});
        if(!First_Name || !Last_Name || !Email || !Salary) return res.status(401).json({error: `atleast one body param is required`});
        const person = updatePerson(id, First_Name, Last_Name, Email, Salary);
        return res.status(200).json(person);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deletePersonController(req, res) {
    try{
        const { id } = req.params;
        deletePersonById(id);
        return res.status(200).json({ message: "Person deleted successfully" });
    }catch (error) {
        return res.status(500).json({error: error.message});
    }
}