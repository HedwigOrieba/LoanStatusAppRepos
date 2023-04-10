const debug = require('debug')('dfcu:startup');
const express = require('express');
const morgan = require('morgan');
const config = require('config');
require('./logging')();
const dbconnector = require('./datasource-connect');
const customers = require('./routes/account_loanstatus_list');
const home = require('./routes/home');
const customeraccList = require('./routes/customer_accounts');
const loanCreator  = require('./routes/loans');
const userrouter = require('./routes/users');
const authrouter = require('./routes/auth');
const errorhandler =  require('./middleware/error_mw');

const app = express();
/*helmet & compression */
require("./prod")(app);

/* Templating Engine */
app.set('view engine', 'pug');
app.set('views','./views');

/* access datasource */
dbconnector();

/* Express Middle-ware */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

/* Enable http logging for development environment */
if(app.get('env') === 'development'){
    app.use(morgan('dev'));
    debug('morgan enabled ....');
}

/* Router-delegation */
app.use('/api/customer/loans', customers);  
app.use('/',home);
app.use('/api/data/customer/accounts',customeraccList); 
app.use('/api/data/loans',loanCreator); 
app.use('/api/users',userrouter);
app.use('/api/auth', authrouter); 
/* express error middle ware */
app.use(errorhandler);

const port = process.env.PORT || 1900;
app.listen(port, ()=> debug(`Loan status service listening on port ${port}...`));