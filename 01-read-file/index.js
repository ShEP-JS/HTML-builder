const fs= require ('fs');
const path = require ('path');

const url=path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(url,'utf-8');
let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));