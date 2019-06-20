const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, '../database/products.json'));
const db = low(adapter);
db.defaults({ products: [] }).write();

exports.get = () => new Promise((resolve, reject) => {
  try {
    const products = db.get('products').value();
    resolve(products);
  }
  catch (err) {
    reject(err);
  }
});

exports.add = ({ photo, name, price }) => new Promise((resolve, reject) => {
  try {
    const photoDir = path.join('.', 'public', 'assets', 'img', 'products');

    if (!fs.existsSync(photoDir)) {
      console.log('creating upload dir');
      fs.mkdirSync(photoDir);
    }

    fs.renameSync(photo.path, path.join(photoDir, photo.name));

    db.get('products').push({ name, price, filename: photo.name }).write();
    resolve();
  }
  catch (err) {
    reject(err);
  }
});