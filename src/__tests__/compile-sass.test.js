const sass = require('node-sass');
const fs = require('fs');
const path = require('path');
const styledDir = 'src/styles';
const files = fs.readdirSync(styledDir).filter(file => file.endsWith('.scss'));

test('All scss files should produce css', () => {
  files.forEach(file => {
    sass.render({ file: path.join(styledDir, file) }, (err, res) => {
      if (err) {
        fail(err);
      }
      expect(res.css).toBeTruthy();
    });
  });
});
