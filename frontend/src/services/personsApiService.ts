import axios from "axios";

export type Person = {
  Id: string,
  First_Name: string,
  Last_Name: string,
  Email: string,
  Salary: string,
}

/**
 * Fetches (skip, limit + skip) persons from the persons API
 * @param limit the number of responses to fetch
 * @param skip the initial number of responses to skip
 */
export async function getPersonsList(limit: number = 10, skip: number = 0): Promise<Person[]> {
  try {
    const response = await axios.get<Person[]>('http://localhost:3001/persons', {
      params: {limit, skip},
    });
    return response.data;
  } catch (error) {
    console.log(`Error occurred in getPersonsList: ${error}`);
    throw error;
  }
}

/**
 * Fetches a singular person from the persons API
 * @param id id of person whose data is to be fetched
 */
export async function getPersonById(id: string): Promise<Person> {
  try {
    const response = await axios.get(`http://localhost:3001/persons/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updatePersonById(id: string, person: Person): Promise<Person> {
  try{
    const response = await axios.put(`http://localhost:3001/persons/${id}`, person);
    return response.data;
  }catch(error){
    throw error;
  }
}

export async function createPerson(person: Person): Promise<Person> {
  try {
    const response = await axios.post(`http://localhost:3001/persons`, person);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deletePerson(id: string): Promise<true> {
  try{
    const response = await axios.delete(`http://localhost:3001/persons/${id}`);
    return true;
  }catch(error){
    throw error;
  }
}
