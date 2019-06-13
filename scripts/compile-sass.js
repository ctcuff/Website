const fs = require('fs');
const sass = require('node-sass');
const stylesDir = 'src/styles/';
const files = fs.readdirSync(stylesDir).filter(file => file.endsWith('.scss'));

console.log(`Found ${files.length} scss files`);

files.forEach(infile => {
  // Strip the .scss extension and add .css
  const outfile = infile.split('.')
    .slice(0, -1)
    .join('.')
    .concat('.css');

  const options = {
    file: stylesDir + infile,
    outputStyle: 'expanded'
  };

  sass.render(options, (error, result) => {
    if (error) {
      console.log(`Couldn't compile ${outfile}`, error);
      return;
    }

    fs.writeFile(stylesDir + outfile, result.css, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`${infile} compiled to ${outfile}`);
    });
  });
});