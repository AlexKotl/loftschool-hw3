const databaseUtil = require('../utils/database');
const db = databaseUtil.loadDatabase('skills');

db.defaults({ skills: {} });

exports.get = () => new Promise((resolve, reject) => {
  try {
    const skills = db.get('skills').value();
    resolve(skills);
  } catch (err) {
    reject(err);
  }
});

exports.set = ({age, concerts, cities, years}) => new Promise((resolve, reject) => {
  try {
    console.log("Saving", {age, concerts, cities, years});

    db.set('skills', { age, concerts, cities, years }).write();

    resolve();
  } catch (err) {
    reject(err);
  }
});
