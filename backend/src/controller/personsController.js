import {getAllPersons, getPersonById} from "../services/personsService.js";

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
