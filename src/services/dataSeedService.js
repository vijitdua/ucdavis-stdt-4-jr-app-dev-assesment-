import env from "../config/env.js";
import {join} from "path";
import csv from "csvtojson";
import {addData} from "./personsService.js";
import {validate as validateUUID} from 'uuid';

/**
 * Imports csv data for persons
 * @returns {Promise<void>} Promise that resolves to successful completion
 * @throws Error relevant error message
 */
export async function importPersonsData() {
    try {
        const filepath = join(env.rootLocation, 'persons.csv');

        const csvData = await csv().fromFile(filepath);
        let line = 0;

        for (const data of csvData) {
            try {
                validateData(data);
                addData(data.Id, data.First_Name, data.Last_Name, data.Email, data.Salary);
            } catch (error) {
                console.log(`Skipping row due to data validation/import error at line ${line}: ${error.message}`);
            }
            line++;
        }

        console.log('Data seeded successfully');
    } catch (error) {
        // Error block to locate the error before crashing the program
        console.log(`Error seeding data, please ensure the CSV file exists and is configured properly`);
        throw error;
    }
}

/**
 * Validates if the data in a CSV row is valid or throws error
 * (important note: the regex format is copy-pasted from an online regex generator.
 */
function validateData(row) {
    if (!row.Id || !row.First_Name || !row.Last_Name || !row.Email || !row.Salary) throw new Error('incomplete data');
    if (!validateUUID(row.Id)) throw new Error('Invalid ID (is this a valid UUID?)');
    if (typeof row.First_Name !== 'string' || row.First_Name.trim() === '') throw new Error('First_Name invalid');
    if (typeof row.Last_Name !== 'string' || row.Last_Name.trim() === '') throw new Error('Last_Name invalid');
    if (!/^\S+@\S+\.\S+$/.test(row.Email)) throw new Error('Email format invalid');
    if (isNaN(parseFloat(row.Salary)) || !/^[0-9]*(\.[0-9]{0,2})?$/.test(row.Salary.toString())) throw new Error('Salary format invalid');
    return true;
}

export function generateRandomData(){

}