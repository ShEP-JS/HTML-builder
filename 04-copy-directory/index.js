const fs = require('fs');
const path= require ('path');
const option = {withFileTypes: true};
const recursive= { recursive: true };
function copyDir () {
  const filesCopyDir=path.join(__dirname,'files-copy');
  fs.mkdir(path.join(__dirname, 'files-copy'), recursive, err => {
    if (err) throw err;
    const url=path.join(__dirname,'files');
    fs.readdir(url, option, (err, files) => {
      if(err) throw err;
      files.forEach(element => {
        fs.copyFile(path.join(url,element.name), path.join(filesCopyDir, element.name), error => {
          if (error) throw error;
        });
      });
    });
  });
}

copyDir ();