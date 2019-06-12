const { exec } = require('child_process');
const fs = require('fs');

const stylesDir = 'src/styles';

// Only compile the css files
const files = fs.readdirSync(stylesDir).filter(file => file.endsWith('.scss'));

files.forEach(infile => {
  // Strip the .scss extension and add .css
  const outfile = infile
    .split('.')
    .slice(0, -1)
    .join('.')
    .concat('.css');

  exec(`sass ${stylesDir}/${infile} ${stylesDir}/${outfile}`, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`compiled ${infile} => ${outfile}`);
  });
});