const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const stylesDir = 'src/styles/';
const files = fs.readdirSync(stylesDir).filter(file => file.endsWith('.scss'));

console.log(`Found ${files.length} scss files`);

files.forEach(infile => {
  const outfile = path.basename(infile, '.scss').concat('.css');

  const options = {
    file: path.join(stylesDir, infile),
    outputStyle: 'expanded'
  };

  sass.render(options, (error, result) => {
    if (error) {
      console.log(`Couldn't compile ${outfile}`, error);
      return;
    }

    fs.writeFile(path.join(stylesDir, outfile), result.css, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`${infile} compiled to ${outfile}`);
    });
  });
});