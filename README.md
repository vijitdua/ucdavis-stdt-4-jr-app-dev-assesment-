# UC Davis STDT 4 Jr. Application Developer Assessment — Vijit Dua

This repository is an attempt of an assessment required for the UC Davis STDT 4 Jr. App. Dev. Role and has been uploaded
to GitHub as required by the IET for submission. To understand the requirements of the assessment and this project,
refer to the [Assessment Requirements](./assessment-requirements.pdf).

## Prerequisites

Ensure the following are installed before you continue.

- [Node.js](https://nodejs.org/en/) (version 23.x or higher)
- [npm](https://www.npmjs.com/get-npm) (version 10.x or higher)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vijitdua/https://github.com/vijitdua/ucdavis-stdt-4-jr-app-dev-assesment-
   cd ucdavis-stdt-4-jr-app-dev-assesment-
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```

## Starting the server

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

### Error handling

- Server errors will be returned with the appropriate status codes and a json with an error field for further details.
- Data handling errors (such as a failed data import) will be console logged. Failed rows are skipped without stopping
  server initialization.