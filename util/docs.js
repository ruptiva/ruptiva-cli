const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const execSync = require('child_process').execSync

module.exports = {
    readme: (root, name) => {
        console.log(chalk.hex('#F85211')('Generating README.md'))

        fs.writeFileSync(path.join(root, 'README.md'), `# ${name}
This project has been created with  [RuptivaCLI](https://github.com/ruptiva/ruptiva-cli)`)
    }
}
