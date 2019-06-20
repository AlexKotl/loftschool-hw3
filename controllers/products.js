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

exports.set = ({ name, price }) => new Promise((resolve, reject) => {
  try {
    console.log('saving product', { name, price });
    
    db.get('products').push({ name, price }).write();
    resolve();
  }
  catch (err) {
    reject(err);
  }
});