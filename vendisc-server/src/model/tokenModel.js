const sequelize = require('../utils/sequelize');
const Sequelize = require('sequelize');

const Token = sequelize.define('token', {
    tid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: Sequelize.STRING(500),
    uid: Sequelize.INTEGER,
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    ip: Sequelize.STRING(50)
}, {
    tableName: 't_token',
    timestamps:false
});

(async () => {
    await Token.sync();
})();

module.exports = Token;