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
    console.log("Saving", age, concerts, years);
    resolve();
  }
  catch (err) {
    reject(err);
  }
});