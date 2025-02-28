# UC Davis STDT 4 Jr. Application Developer Assessment — Vijit Dua

This repository started as an attempt of an assessment required for the second (& final) stage of the UC Davis STDT 4
Jr. App. Dev. Role application and was uploaded
to GitHub as required by the IET for submission. To understand the requirements of the assessment and this project,
refer to the [Backend Assessment Requirements](./backend/assessment-requirements.pdf).

This repository has, since then, been modified to slightly improve the backend and create a Vue.js frontend for the same
backend in an attempt to learn Vue.js for the same job role.

## Prerequisites

Ensure the following are installed before you continue.

- [Node.js](https://nodejs.org/en/) (version 23.x or higher)
- [npm](https://www.npmjs.com/get-npm) (version 10.x or higher)

## Installation (backend and frontend both)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vijitdua/ucdavis-stdt-4-jr-app-dev-assesment-
   cd ucdavis-stdt-4-jr-app-dev-assesment-
   ```
   
   - If working on the backend
      ```bash
      cd backend
      ```
     
   - If working on the frontend
       ```bash
      cd frontend
      ```
   
2. **Install dependencies**:
   ```bash
   npm install
   ```

## Starting the backend server

1. **Ensure `persons.csv` file exists**

    - Ensure the file persons.csv in the root location of the repository exists with the following fields:
        - `Id` (valid UUIDv4 string)
        - `First_Name` (any string)
        - `Last_Name` (any string)
        - `Email` (valid email format)
        - `Salary` (float number with at max 2 digits)
    - You may also optionally generate a .csv field with valid data by going to the root repository location and running
      the following:
        ```bash
        node generateCsv.js
        ```

2. **Run npm start**

    - Run the following
    ```bash
    npm start
    ```

### Error handling (server)

- Server errors will be returned with the appropriate status codes and a json with an error field for further details.
- Data handling errors (such as a failed data import) will be console logged. Failed rows are skipped without stopping
  server initialization.

### Frontend documentation
- Minimally documented
- Basic vite vue.js commands — npm run dev etc.
