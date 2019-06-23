const { config } = require('../config');

exports.auth = (login, password) => new Promise(async (resolve, reject) => {
  try {
    console.log(config);
    
    if (login === config.login && password === config.password) {
      resolve();
    }
    
    reject("Incorrect credentials");
  }
  catch (error) {
    reject(error);
  }
})