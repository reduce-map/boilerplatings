const json2xls = require('json2xls');
const fs = require('fs');

function saveToExel(data, pathToFile){
  const xls = json2xls(data);

  fs.writeFile(`${pathToFile}.xlsx`, xls, 'binary', err => {
      if(err) return console.log(err);
      console.log('saved')
  })
}

module.exports = {
  saveToExel,
}
