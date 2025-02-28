import {inMemoryDatabase} from "../models/personsModel.js";

/**
 * Returns the data of every stored person
 * @returns {Object[]} - Array of record objects
 *   - {string} Id
 *   - {string} First_Name
 *   - {string} Last_Name
 *   - {string} Email
 *   - {number} Salary
 *
 */
export function getAllPersons() {
    return Object.values(inMemoryDatabase);
}

/**
 * Returns the data of a specific person
 * @param {string} id - Identifier of the person whose data is to be received
 * @throws error if person not found
 * @returns {Object} - Person's record (if found)
 * - {string} Id
 * - {string} First_Name
 * - {string} Last_Name
 * - {string} Email
 * - {number} Salary
 */
export function getPersonById(id) {
    if (!inMemoryDatabase[id]) {
        throw new Error('Data not found.');
    }
    return inMemoryDatabase[id];
}

/**
 *
 * @param {string} id - unique identifier of the person
 * @param {string} firstName - first name of the person
 * @param {string} lastName - last name of the person
 * @param {string} email - email of the person
 * @param {Number} salary - salary of the person
 * @returns true - if successful
 * @throws error - relevant errors based on input issues
 */
export function addData(id, firstName, lastName, email, salary) {
    if (!firstName || !lastName || !email || !salary) throw new Error('All fields are required.');

    if (Number(salary) <= 0) throw new Error('Salary must be a positive number.');

    inMemoryDatabase[id] = {
        Id: id,
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        Salary: parseFloat(Number(salary).toFixed(2)),
    };

    return true;
}