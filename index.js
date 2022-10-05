#!/usr/bin/env node
// var argv = require('minimist');




import minimist from 'minimist'
import { customLog, sleep, welcome, askOption1, askCloneRepo, askRepoInfo, handleSpinner, executeCommand } from "./Util.js"
import { clearDb, appendData, readDb, deleteData } from './dbFunctions.js';

console.clear()
// console.log(argv(process.argv));

const argv = minimist(process.argv).repo;





if (!argv) {
    await welcome()
    const response1 = await askOption1();
    if (response1 === 'Clone a Github Repository') {
        const result = readDb();
        const options = result?.data;
        if (options?.length) {
            const selectedRepo = await askCloneRepo(options);
            if (selectedRepo?.link) {
                const pd = executeCommand(selectedRepo.link);
                await handleSpinner(true, `Cloned`);
            } else {
                customLog(`something Wrong with repo!!\nCheck the link`)
            }
        } else {
            customLog(`There is no Data. Please insert one.`)
        }
    }
    else if (response1 === 'Delete a Repository') {
        const result = readDb();
        const options = result?.data;
        if (options?.length) {
            const selectedRepo = await askCloneRepo(options);
            if (selectedRepo?.alias) {
                const rt = deleteData(selectedRepo.alias);
                if (rt) {
                    await handleSpinner(true, `Deleted ${selectedRepo.alias}`);
                    // customLog()
                }
            } else {
                customLog(`something Wrong with repo!!\nCheck the link`)
            }
        } else {
            customLog(`There is no Data. Please insert one.`)
        }
    }
    else if (response1 === 'Clear Data') {
        const result = clearDb();
        if (result) {
            await handleSpinner(true, 'Data has been Cleared!');
            // customLog()
        } else {
            customLog('Something wrong!')
        }
    }
    else if (response1 === 'Add a Github Repository') {
        const pd = await askRepoInfo();
        const res = appendData(pd);
        if (res) {
            await handleSpinner(true, `new repository has been added!`);
        }
    }
    else if (response1 === 'View Repositories') {
        const result = readDb();
        const options = result?.data;
        if (options?.length) {
            customLog('List of Saved repositories:')
            options.map((v, i) => {
                customLog(`${i + 1}. ${v.alias}`);
            })
        } else {
            customLog(`There is no Data. Please insert one.`)
        }
    }
} else {
    const result = readDb();
    const options = result?.data;
    if (options?.length) {
        let found = options.find((v) => {
            return v.alias == argv;
        });
        if (found && found.link) {

            const pd = executeCommand(found.link);
            await handleSpinner(true, `Cloned`);

        } else {
            customLog(`something Wrong with repo!!\nCheck the link`)
        }
    } else {
        customLog(`There is no Data. Please insert one.`)
    }
}


