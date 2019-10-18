const fs = require('fs');
const path = require('path');

function writeFile(content, destination) {
  // Ensure path exists, creating if needed
  if (!fs.existsSync(path.dirname(destination))) {
    fs.mkdirSync(path.dirname(destination), { recursive: true }, (err) => {
      if (err) throw err;
    });
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(destination, content, (err) => (err ? reject(err) : resolve()));
  });
}

module.exports = writeFile;
