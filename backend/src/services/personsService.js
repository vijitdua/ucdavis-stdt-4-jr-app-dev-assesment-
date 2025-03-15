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
export function getAllPersons(limit, skip) {
    return Object.values(inMemoryDatabase).slice(Number(skip), Number(skip) + Number(limit));
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

export function deletePersonById(id) {
    if (!inMemoryDatabase[id]) {
        throw new Error('Data not found.');
    }
    inMemoryDatabase[id] = null;
    return true
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

    return inMemoryDatabase[id];
}

/**
 * Updates an existing person in the database
 */
export function updatePerson(id, First_Name, Last_Name, Email, Salary) {
    if (!inMemoryDatabase[id]) throw new Error('Person not found.');

    if (First_Name) inMemoryDatabase[id].First_Name = First_Name;
    if (Last_Name) inMemoryDatabase[id].Last_Name = Last_Name;
    if (Email) inMemoryDatabase[id].Email = Email;
    if (Salary !== undefined) {
        if (Number(Salary) <= 0) throw new Error('Salary must be a positive number.');
        inMemoryDatabase[id].Salary = parseFloat(Number(Salary).toFixed(2));
    }
    return inMemoryDatabase[id];
}