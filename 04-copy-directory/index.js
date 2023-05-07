const fs = require('fs');
const path= require ('path');
const option = {withFileTypes: true};
const recursive= { recursive: true };
function copyDir () {
  const filesCopyDir=path.join(__dirname,'files-copy');
  fs.stat(filesCopyDir, (err) =>{
    if (!err) {
      fs.rm(filesCopyDir, recursive, (err) => {
        if (err) throw err; 
        copyFiles(filesCopyDir);
      });
    } else {
      copyFiles(filesCopyDir);
    }
  });
}

function copyFiles(filesCopyDir) {
  fs.mkdir(filesCopyDir, error => {
    if (error) throw error;
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