import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const records = ["Id,First_Name,Last_Name,Email,Salary"];
for (let i = 0; i < 100; i++) {
    const uniqueId = uuidv4();
    const firstName = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const lastName = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@mail.com`;
    const salary = (Math.random() * (120000 - 30000) + 30000).toFixed(2);
    records.push(`${uniqueId},${firstName},${lastName},${email},${salary}`);
}

fs.writeFileSync("./persons.csv", records.join("\n"));

console.log("CSV file 'persons.csv' has been created with 100 records.");
