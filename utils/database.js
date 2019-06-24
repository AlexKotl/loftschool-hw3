const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

exports.loadDatabase = name => {
  const adapter = new FileSync(path.join(__dirname, `../database/${name}.json`));
  return low(adapter);
};