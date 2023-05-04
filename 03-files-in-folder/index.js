let fs = require('fs');
const path= require ('path');
const url=path.join(__dirname,'secret-folder');
const option = {withFileTypes: true};
fs.readdir(url, option, (err, files) => {
  if(err) throw err;
  let arr = files.filter(item => item.isFile());
  arr.forEach(element => {
    let extname=path.extname(element.name);
    fs.stat(path.join(url,element.name), (error, stats) => {
      let size= +stats.size/1024;
      console.log (path.basename(element.name, extname) + ' - ' + extname + ' - ' + size + 'kb');
    });
    
  });
});


