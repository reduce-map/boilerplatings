
const fs = require('fs');
const formatedJSON = data => JSON.stringify(data, null, 2)
function saveToJson (pathToFile, data) {
  const stream = fs.createWriteStream(`${pathToFile}.json`);

  stream.write(formatedJSON(data));
  stream.end();
}

module.exports = {
  saveToJson,
}
