const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const Podlet = require("@podium/podlet");
const fs = require("fs");

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

// Basic definition of the podlet
const podlet = new Podlet({
    name: "hbsHead", // required
    version: "1.0.0", // required
    pathname: "/", // required
    manifest: "/manifest.json", // optional, defaults to '/manifest.json'
    development: true, // optional, defaults to false
  });
  
  // apply middleware
  app.use(podlet.middleware());
  
  // add HTML to send. This is the div ID in public/index.html
  app.get(podlet.content(), (req, res) => {
    res.status(200).podiumSend('<div id="hbs-head"></div>');
  });
  
  // generate the podlet manifest
  app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
  });

const server = app.listen(app.get('port'), function () {
  console.log('Servidor en puerto ' + app.get('port'));
  console.log('Ir a http://localhost:' + app.get('port'));
  console.log('MODE:' + process.env.NODE_ENV);
});

