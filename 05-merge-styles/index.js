const fs = require('fs');
const path= require ('path');
const url=path.join(__dirname, 'styles');
const option = {withFileTypes: true};
fs.readdir(url, option, (err,files) => {
  if (err) throw err;
  let arr = files.filter(item => item.isFile() && path.extname(item.name) === '.css');
  const bundleFile=path.join(__dirname, 'project-dist', 'bundle.css');
  const output = fs.createWriteStream(bundleFile);
  arr.forEach(element => {
    const stream = fs.createReadStream(path.join(url, element.name),'utf-8');
    let data = '';
    stream.on('data', chunk => data += chunk);
    stream.on('end', () => output.write(data));
  });
});