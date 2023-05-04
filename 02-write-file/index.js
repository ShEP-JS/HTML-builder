const {stdin, stdout} = process;
const fs= require ('fs');
const path= require ('path');
const url=path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(url);
stdout.write('Insert text\n');
stdin.on('data', chunk => {
  if (chunk.toString().toLowerCase().trim() === 'exit') {
    process.exit();
  } else {
    output.write(chunk);
  }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => console.log ('\nGood bye'));

