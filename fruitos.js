const readline = require('readline');
const os = require("os");

const { spawn } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let user = os.userInfo().username;
let currentDir = '/home/' + os.userInfo().username;

console.log('FruitOS v0.69.1\nBuild 6f970b');
ask();

function ask() {
  rl.question(user + '@localhost ' + currentDir + ' $ ', (answer) => {
    if(answer == 'help') {
      console.log('* ls - List Files.');
    } else if(answer == 'ls') {
      spawn('ls', ['-lh', currentDir]).stdout.on('data', (data) => {
        console.log(`\n${data}`);
      });
    } else if(answer == 'neofetch') {
      spawn('neofetch').stdout.on('data', (data) => {
        console.log(`\n${data}`);
      });
    } else if(answer.includes('echo')) {
      let echo = 'echo ';
      const answer2 = answer.replace(echo, '');
      const args = answer2.split(' ');

      console.log(args.join(' '));
    } else if(answer == 'clear') {
      console.clear();
    } else {
      console.log('Invalid command.')
    }

    ask();
  });
}