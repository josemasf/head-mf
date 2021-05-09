const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

const port = process.env.PORT || 3000;

dotenv.config({
    path: path.resolve(__dirname,`.env.${ process.env.NODE_ENV}`)
  });

app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({    
    extname: '.hbs'    
}));


app.set('port', port);

app.get('/', (req, res) => {
    res.render('head');
})

const server = app.listen(app.get('port'), function () {
  console.log('Servidor en puerto ' + app.get('port'));
  console.log('Ir a http://localhost:' + app.get('port'));
  console.log('MODE:' + process.env.NODE_ENV);
});

