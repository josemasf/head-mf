const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const Podlet = require("@podium/podlet");


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

const domain = 'http://localhost';
const url = `${domain}:${port}`;

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
    res.status(200).podiumSend(`
        <app-header></app-header>
        <script type="module">
          import { MessageBus } from "https://cdn.jsdelivr.net/npm/@podium/browser";
          const messageBus = new MessageBus();

          const head = document.querySelector("app-header");
          head.addEventListener("login", () => {
            messageBus.publish('internalchannel', 'login', {message: 'login', from: 'vue head'});
            console.log('pong')
          });
        </script>
    `);
});
  // generate the podlet manifest
  app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
  });

  app.use('/js', express.static('src'));
podlet.js({ value: `${url}/js/header.js` });

const server = app.listen(app.get('port'), function () {
  console.log('Servidor en puerto ' + app.get('port'));
  console.log('Ir a http://localhost:' + app.get('port'));
  console.log('MODE:' + process.env.NODE_ENV);
});

