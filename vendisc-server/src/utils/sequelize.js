const Sequelize = require('sequelize');
const config = require('../config/constant.json');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    timezone: '+08:00',
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    }
});

module.exports = sequelize;