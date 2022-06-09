const chalk = require("chalk");
const boxen = require("boxen");
const figlet = require('figlet');
module.exports.greeting = greeting;

function greeting(){
    console.log(
        chalk.green(
          figlet.textSync('author aldoniq', { horizontalLayout: 'full' })
        )
    );
    const greeting = chalk.white.bold(`Привет!\nДобро пожаловать в сервис сдачи домашки!`);
    

    const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "green",
        backgroundColor: "#555555"
    };
    const msgBox = boxen( greeting, boxenOptions );

    console.log(msgBox);
}
