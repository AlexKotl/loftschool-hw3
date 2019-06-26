const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();

app.set('views', './views/pages');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './public/assets/img/products/'
}));

// include middlewares
const list = fs.readdirSync('./middlewares').sort();
list.forEach(file => {
  app.use(require(`./middlewares/${file}`));
});

app.use('/', require('./router/index'));

app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});
