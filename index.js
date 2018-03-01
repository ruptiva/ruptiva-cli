#!/usr/bin/env node
const chalk = require('chalk')
const readline = require('readline')
const program = require('commander')
const inquirer = require('inquirer')
const folder = require('./util/folder')
const reduxHelper = require('./util/redux')
const docs = require('./util/docs')
const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync

const blank = '\n'.repeat(process.stdout.rows)

const questions = [
    {
        name: 'name',
        type: 'input',
        message: 'Project name'
    },
    {
        name: 'method',
        type: 'list',
        message: 'Project creation method',
        choices: ['native', 'expo'],
        default: 'native'
    },
    {
        name: 'redux',
        type: 'list',
        message: 'Add Redux support (@erikras/ducks-modular-redux)?',
        choices: ['yes', 'no'],
        default: 'yes'
    }
]

program
    .version('1.0.0')
    .description('Boilerplate generator by Ruptiva')

program
    .command('init')
    .action(() => {

        console.log(chalk.hex('#F85211').bold('--------------------------------'))
        console.log(chalk.hex('#F85211').bold('Boilerplate generator by Ruptiva'))
        console.log(chalk.hex('#F85211').bold('--------------------------------'))

        inquirer.prompt(questions)
            .then(answers => {
                const { name, method, redux } = answers

                if (folder.exists(name)) {
                    console.log(chalk.red(`Folder ${chalk.bold(name)} already exists. Choose another name for your project.`))
                    process.exit(1)
                } else {

                    const root = path.resolve(name)

                    if (method === 'expo') {
                        console.log(chalk.hex('#F85211')(`Generating ${name} using the Native CLI`))
                        console.log(chalk.hex('#F85211')(`Installing dependencies. This could take a while...`))
                        execSync(`create-react-native-app ${name}`, { stdio: [0, 1, 2] })

                        console.log(blank)
                        readline.cursorTo(process.stdout, 0, 0)
                        readline.clearScreenDown(process.stdout)

                        console.log(chalk.hex('#F85211')('Generating folder structure...'))
                        execSync(`cd ${name} && mkdir -p src/assets src/components src/views src/services src/config`)
                    }

                    if (method === 'native') {
                        console.log(chalk.hex('#F85211')(`Generating ${name} using the Native CLI`))
                        console.log(chalk.hex('#F85211')(`Installing dependencies. This could take a while...`))
                        execSync(`react-native init ${name}`, { stdio: [0, 1, 2] })

                        console.log(blank)
                        readline.cursorTo(process.stdout, 0, 0)
                        readline.clearScreenDown(process.stdout)

                        console.log(chalk.hex('#F85211')('Generating folder structure...'))
                        execSync(`cd ${name} && mkdir -p src/assets src/components src/views src/services src/config`)
                    }

                    if (redux === 'yes') {
                        reduxHelper.addSupport(root, name)
                    }

                    docs.readme(root, name)

                    console.log(chalk.hex('#F85211').bold('Setup completed!\n'))
                    console.log(chalk.hex('#F85211')(`Navigate inside your project: ${chalk.bold(`cd ${name}\n`)}`))
                    console.log(chalk.hex('#F85211')('Start your project:'))
                    console.log(chalk.hex('#F85211')(`IOS: ${chalk.bold(`${method === 'expo' ? 'npm run ios' : 'react-native run-ios'}`)}`))
                    console.log(chalk.hex('#F85211')(`Android: ${chalk.bold(`${method === 'expo' ? 'npm run android' : 'react-native run-android'}`)}\n`))
                    console.log(chalk.hex('#F85211').bold('Happy hacking!'))
                    process.exit(1)
                }
            })
    })

program.parse(process.argv)
