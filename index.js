#!/usr/bin/env node
const fs = require('fs');
require('dotenv').config()
var Choices = require('prompt-choices');
const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const figlet = require('figlet');
const greeting =  require('./greeting');
const { base } = require('airtable');
var Airtable = require('airtable');
const { time } = require('console');
var airtable = new Airtable({apiKey: process.env["API_KEY"] });
var sendHW = airtable.base(process.env["BASE_ID"]);
const inquirer = require('inquirer');
let homeworkList = require('./homeworks.json');
let studentList = require('./students.json');
const inquirerPrompt = require('inquirer-autocomplete-prompt');

const CLIInfinityProgress = require('cli-infinity-progress');
const colors = require('cli-infinity-progress/colors');

const progress = new CLIInfinityProgress();
greeting.greeting()

async function run() {
    const { checking, student, homework, linkSandbox, linkGithub, comment } = await chooseStudent();
    const value = await sendToServer({checking, student, homework,linkSandbox, linkGithub,comment });
  }
function chooseStudent() {
    const questions = [
        {
            type: 'text',
            name: 'checking',
            message: 'Ты точно наш студент? 🤨 Введи кодовое слово: ',
            validate: value => {
                const check = value.includes(process.env["SECRET_ANSWER"])
                return new Promise((resolve, reject) => {
                    if (!check){
                        reject("Кажется ты не наш студент :) Попробуй заново: ")
                    } else {
                        resolve(true)
                    }
                })
            }
        },
        {
            type: 'search-list',
            name: 'student',
            message: 'Выберите себя: ',
            choices: studentList.map(student => student),
            
        },
        {
            type: 'search-list',
            name: 'homework',
            message: 'Какую домашку вы хотите отправить?',
            choices: homeworkList.map(homework => homework)
        },
        {
            type: 'text',
            name: 'linkSandbox',
            message: 'Введите ссылку на ваш codeSandBox/npm: '
        },
        {
            type: 'text',
            name: 'linkGithub',
            message: 'Дайте ссылку на ваш репозиторий: ',
            validate: value => {
                const check = value.includes('github.com')
                return new Promise((resolve, reject) => {
                    if (!check){
                        reject("Это не ссылка на репозиторий GITHUB!!!")
                    } else {
                        resolve(true)
                    }
                })
            }
        },
        {
            type: 'text',
            name: 'comment',
            message: 'Комментарии к домашке: ',
        },
        
    ];
    inquirer.registerPrompt("search-list", require("inquirer-search-list"));
    return inquirer.prompt(questions)
}



async function sendToServer({checking, student, homework,linkSandbox, linkGithub,comment }) {
    if (checking === process.env["SECRET_ANSWER"]){
        progress.setBackgroundColor(colors.white)
        .setHeader('Sending ...')
        .setFooter('\nPlease be patient.')
        .setBarChar('🤜📧')
        .setBackgroundChar(' ')
        .setDirectionLeftToRight()
        .setSize(20)
        .setBarSize(1)
        .setRefreshRate(150)
        .start();
    await sendHW('HW Submissions').create([
    {
        "fields": {
            "HW Submission Link ID": [
                studentList.filter(x => x.name === student)[0].id
            ],
            "Homework": [
                homeworkList.filter(h => h.name === homework)[0].id
            ],
            "Sandbox": linkSandbox,
            "github repo": linkGithub,
            "Student's comment": comment
        }
        }
    ], function(err, records) {
        if (err) {
        console.error(err);
        return;
        }
        records.forEach(function (record) {
            const boxenOptions = {
                padding: 1,
                margin: 1,
                borderStyle: "round",
                borderColor: "green",
                backgroundColor: "#555555"
            };
            const end = boxen(chalk.white.bold(`Спасибо за использование этой CLI!!!\nУспешно отправлено`), boxenOptions );
            progress.remove();
            console.log(end);
        });
    });
    } else {
        console.log("Вы не прошли проверку извините)");
    }
    
  }
run();
