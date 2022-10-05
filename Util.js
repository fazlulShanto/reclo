import chalk from "chalk";
import gs from 'gradient-string';
import inquirer from "inquirer";
import {createSpinner} from 'nanospinner'
import {exec,execSync} from 'child_process'
/**
 * 
 * @param {String} text 
 */
 export const customLog= (text)=> {
    console.log(chalk.bgBlack(gs.pastel(text)))
}
export const sleep = (ms=2000) =>{
    return new Promise((r) =>  setTimeout(r,ms))
}
export const askRepoInfo = async ()=>{
    const option = await inquirer.prompt([
        {
            name:'alias',
            type:'input',
            message :'Give a Name',
        },
        {
            name:'github_link',
            type:'input',
            message :'paste your Github link',
        }
    ])

    return {alias  : option.alias , link : option.github_link};
}
export const askCloneRepo = async (options= [])=>{
    const choiceArray = options.map( v => v.alias);

    const option = await inquirer.prompt({
        name:'action_choice',
        type:'list',
        message :'Which Repository you want to clone?',
        choices:choiceArray
    })

    return options.filter(v => v.alias == option.action_choice).pop();
}
export const askOption1 = async ()=>{
    const option = await inquirer.prompt({
        name:'action_choice',
        type:'list',
        message :'What you want to do?',
        choices:[
            'Clone a Github Repository',
            'Add a Github Repository',
            'View Repositories',
            'Clear Data',
            'Delete a Repository'
        ]
    })

    return option.action_choice;
}



export async function welcome(){
    customLog('Welcome to the cli\n')
    // await sleep();
}

export async function handleSpinner(value = false,text){
    const spinner = createSpinner(`Working...`).start();
    await sleep();

    if(value){
        spinner.success({
            text :   text || 'Done'
        });
    }else{
        spinner.error({
            text : `Failed!`
        })
        // process.exit(1);
    }
}


export const  executeCommand = (link = "") => {
    if (link.includes(`https://github.com/`) && link.includes('.git')) {
  
      const command = `git clone --depth=1 ${link}`;
      exec(command, (err, res) => {
        if (err) {
          // console.log(err);
          return false;
        } else {
  
          return true;
        }
      })
    }
    return false;
  }