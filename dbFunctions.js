import fs from 'node:fs';
import path from 'node:path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const dbPath = path.join(__dirname,"data", "db.json");

export const clearDb = () => {
    try {
        fs.writeFileSync(dbPath, `{}`,{
            flag:'w+'
        });
        return true;
    } catch (error) {
        // console.log("error while clearing DB");
        return false;
    }
};
export const readDb = () => {
    try {
		//console.log(dbPath)
        const data = fs.readFileSync(dbPath, {
            encoding: "utf-8",
            flag: "r",
        });

        return JSON.parse(data);
    } catch (error) {
        return {};
        // console.log("error while reading DB");
    }
};
export const appendData = (data) => {
    try {
        const rd = readDb();
        const oldData = rd?.data;
        const newData = {};
        if (oldData) {
            newData.data = [...oldData, data];
        } else {
            newData.data = [data];
        }
        fs.writeFileSync(dbPath, JSON.stringify(newData), {
            encoding: "utf-8",
            
        });
        return true;

    } catch (error) {
        return false;
    }
};
export const deleteData = (alias) => {
    try {
        const rd = readDb();
        const oldData = rd?.data;
        const newData = {};
        if (oldData) {
            newData.data = oldData.filter( v => v.alias != alias);
        } else {
            newData.data = [];
            return false;
        }
        fs.writeFileSync(dbPath, JSON.stringify(newData), {
            encoding: "utf-8",
        });
        return true;
    } catch (error) {
        return false;
    }
}
