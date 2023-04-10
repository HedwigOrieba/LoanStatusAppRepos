const mongoose =  require('mongoose');

const config = require('config');
const { string, number, custom } = require('joi');
const debug = require('debug')('dfcu:startup');

async function connectDb(){
    try {      
           await mongoose.connect(config.get('dbconStr'),{useUnifiedTopology: true,useNewUrlParser: true});
           debug(`Connection to database server successfully established.`);
    } catch (error) {
           debug( `Datasource error: ${error.message}`);
           //some logging.
           res.status(500).send('Unable to connect to the app-database');
           
    }
}


module.exports = connectDb;