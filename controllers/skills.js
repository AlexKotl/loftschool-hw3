const fs = require('fs');
const path = require('path');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

exports.get = () => new Promise((resolve, reject) => {
  try {
    resolve();
  }
  catch (err) {
    reject(err);
  }
});

exports.set = ({age, concerts, cities, years}) => new Promise((resolve, reject) => {
  try {
    console.log("Saving", {age, concerts, cities, years});

    const adapter = new FileSync(path.join(__dirname, '../database/skills.json'));
    const db = low(adapter);

    db.defaults({ skills: {} }).write(); 
    db.set('skills', { age, concerts, cities, years }).write();

    resolve();
  }
  catch (err) {
    reject(err);
  }
});