/*Here, you can export the data functions
to get the comapnies, people, getCompanyByID, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

import { getAllPeople, getAllCompanies } from "../helpers.js";
const getCompanies = async () => {
  return await getAllCompanies();
};

const getPeople = async () => {
  return await getAllPeople();
};

const getCompanyById = async (id) => {
  if (!id.trim()) {
    throw new Error("No ID provided");
  }
  const companies = await getAllCompanies();
  const company = companies.find((company) => company.id === id);
  return company;
};

const getPersonById = async (id) => {
  if (!id.trim()) {
    throw new Error("No ID provided");
  }
  const people = await getAllPeople();
  const person = people.find((person) => person.id === id);
  return person;
};

export { getCompanies, getPeople, getCompanyById, getPersonById };
