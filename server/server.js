const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dev = process.env.NODE_DEV !== 'production'; //true false
const prod = process.env.NODE_DEV === 'production'; //true false
const nextApp = next({ dev });
const routes = require('./routes');
const routerHandler = routes.getRequestHandler(nextApp);
const passport = require('passport');
const glob = require('glob');
const cors = require('cors');
const { config } = require('../config/config');


const users = require('./routes/api/users');

const app = express();




nextApp.prepare().then(() => {



    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());



// DB config

// Connect to MongoDB
    mongoose.connect(config.databaseUrl,{useNewUrlParser: true,useUnifiedTopology: true})
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));

// Passport middleware
    app.use(passport.initialize());





// Passport config
    require('./config/passport')(passport);

    app.use(cors());

    app.use('/api/users',users);

    const rootPath = require('path').join(__dirname, '/..')
    glob.sync(rootPath + '/server/api/*.js').forEach(controllerPath => {
        if (!controllerPath.includes('.test.js')) require(controllerPath)(app)
    })
    app.get('*', routerHandler);
    app.listen(config.serverPort, () => console.log(`${config.appName} running on http://localhost:${config.serverPort}/`));

});

