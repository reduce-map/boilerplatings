const express = require('express')
const bodyParser = require('body-parser').json()
const app = express()
const cors = require('cors')();
const passport = require('passport');
const jwt = require('jsonwebtoken');


app.use(bodyParser);
app.use(cors);
app.use(passport.initialize());

require('./config/passport')(passport);


// some static
app.use(express.static('../client/dist'))

require('./routes/index')(app);

app.listen(process.env.PORT || 8080)