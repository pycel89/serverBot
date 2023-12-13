const {Sequelize} = require('sequelize')
//require('dotenv').config()

module.exports = new Sequelize(
    process.env.DB_NAME,
    //'Bot',
    //'postgres',
    //'toor',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect:'postgres',
        //host:'localhost',
        //port:5432
        host: process.env.DB_HOST,
        port:process.env.DB_PORT
    }    
)