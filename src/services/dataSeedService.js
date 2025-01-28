import env from "../config/env.js";
import {join} from "path";
import csv from "csvtojson";
import {addData} from "./personsService.js";

/**
 * Imports csv data for persons
 * @returns {Promise<void>} Promise that resolves to successful completion
 * @throws Error relevant error message
 */
export async function importPersonsData(){
    try{
        const filepath = join(env.rootLocation,'persons.csv');

        const csvData = await csv().fromFile(filepath);

        for(const data of csvData){
            addData(data.Id, data.First_Name, data.Last_Name, data.Email, data.Salary);
        }

        console.log('Data seeded successfully')
    }catch(error){
        // Error block to locate the error before crashing the program
        console.log(`Error seeding data, please ensure the CSV file exists and is configured properly`);
        throw error;
    }
}