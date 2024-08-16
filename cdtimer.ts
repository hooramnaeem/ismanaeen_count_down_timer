#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


import { differenceInSeconds } from "date-fns";

console.log(chalk.italic.green('\n\t ===========================================\n\t'));
console.log(chalk.italic.bgBlueBright('\t************COUNT DOWN TIMER*************\t'));
console.log(chalk.italic.green('\n\t ===========================================\n\t'));

const res = await inquirer.prompt({
    type:"number",
    name:"userinput",
    message:"please set the time in  seconds",
    validate:(input)=>{
        if (isNaN(input)){
            return"please enter valid number"
        }
        else if (input > 60){
            return"seconds should not be more than 60."
        }
        else{
            return true;
        }
    }
});



let input =res.userinput

function StartCountDown(value: number) {
    const endTime = new Date().getTime() + value * 1000; // Store the end time as milliseconds

    const intervalId = setInterval(() => {
        const currentTime = new Date().getTime(); // Get current time in milliseconds
        const timediff = Math.round((endTime - currentTime) / 1000); // Calculate difference in seconds

        if (timediff <= 0) {
            console.log(chalk.bold.greenBright('Time is up now!'));
            clearInterval(intervalId); // Clear the interval to stop the timer
            process.exit();
        } else {
            const minutes = Math.floor(timediff / 60); // Calculate minutes
            const seconds = timediff % 60; // Calculate seconds
            console.log(chalk.italic.red(`Remaining time = ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`));
        }
    }, 1000);
}

StartCountDown(input);
