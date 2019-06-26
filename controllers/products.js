const fs = require('fs');
const path = require('path');
const databaseUtil = require('../utils/database');
const db = databaseUtil.loadDatabase('products');

db.defaults({ products: [] }).write();

exports.get = () => new Promise((resolve, reject) => {
  try {
    console.log('prodsss', db.get('products').value())
    const products = db.get('products').value();
    resolve(products);
  } catch (err) {
    reject(err);
  }
});

exports.add = ({ photo, name, price }) => new Promise((resolve, reject) => {
  try {
    const photoDir = path.join('.', 'public', 'assets', 'img', 'products');
    photo.name = + new Date() + ' ' + photo.name; // add timetstamp for unique filename

    if (!fs.existsSync(photoDir)) {
      console.log('creating upload dir');
      fs.mkdirSync(photoDir);
    }

    fs.renameSync(photo.path, path.join(photoDir, photo.name));

    db.get('products').push({ name, price, filename: photo.name }).write();
    resolve();
  } catch (err) {
    reject(err);
  }
});
