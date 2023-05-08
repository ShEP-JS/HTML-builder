const fs = require('fs');
const path = require ('path');
const template = path.join(__dirname, 'template.html');
const components =path.join(__dirname, 'components');
const stream = fs.createReadStream(template,'utf-8');
const option= {withFileTypes: true};
const recursive = {recursive: true};
const assets= path.join(__dirname, 'assets');
const styles=path.join(__dirname, 'styles');
let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', createProjectDist);

let projectDist = path.join(__dirname, 'project-dist');

function createProjectDist () {
  fs.stat(projectDist, (err) =>{
    if (!err) {
      fs.rm(projectDist, recursive, (err) => {
        if (err) throw err; 
        fs.mkdir(projectDist, (err) => {
          if (err) throw err;
          prepareDistHTML();
          bundleCSS ();
          copyAssets(assets, path.join(projectDist, 'assets'));
        });
      });
    } else {
      fs.mkdir(projectDist, (err) => {
        if (err) throw err;
        prepareDistHTML();
        bundleCSS ();
        copyAssets(assets, path.join(projectDist, 'assets'));
      });
    }
  });
}

function prepareDistHTML() {
  fs.readdir (components, option, (err, files) => {
    if (err) throw err;
    let arr = files.filter(item => item.isFile() && path.extname(item.name) === '.html');
    for (let i=0; i<arr.length; i += 1) {
      let componentName = path.basename(arr[i].name, '.html');
      const streamComponent = fs.createReadStream(path.join(components, arr[i].name),'utf-8');
      let dataComponent = '';
      streamComponent.on('data', chunk => dataComponent += chunk);
      streamComponent.on('end', () => {
        data = data.replace(`{{${componentName}}}`, dataComponent);
        if ( i === arr.length-1 ) {
          let distHTML = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
          distHTML.write(data);
        }
      });
    }
  });
}

function bundleCSS () {
  fs.readdir(styles, option, (err,files) => {
    if (err) throw err;
    let arr = files.filter(item => item.isFile() && path.extname(item.name) === '.css');
    const bundleFile=path.join(projectDist, 'style.css');
    const output = fs.createWriteStream(bundleFile);
    arr.forEach(element => {
      const stream = fs.createReadStream(path.join(styles, element.name),'utf-8');
      let data = '';
      stream.on('data', chunk => data += chunk);
      stream.on('end', () => output.write(data));
    });
  });
}

function copyAssets (source, target){
  fs.mkdir (target, err => {
    if (err) throw err;
    fs.readdir(source, option, (err, files) =>{
      if (err) throw err;
      for (let i = 0; i < files.length; i += 1) {
        if (files[i].isFile()) {
          fs.copyFile(path.join(source,files[i].name), path.join(target, files[i].name), error => {
            if (error) throw error;
          });
        } else {
          copyAssets (path.join(source, files[i].name), path.join(target, files[i].name));
        }
      }
    });
  });
}