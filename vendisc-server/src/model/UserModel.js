const sequelize = require('../utils/sequelize');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
    uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uname: Sequelize.STRING(20),
    username: Sequelize.STRING(16),
    password: Sequelize.STRING(256),
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    capacity: {
        type: Sequelize.BIGINT,
        defaultValue: 1024 * 1024 * 1024  // 1 GB
    },
    email: Sequelize.STRING(50),
    root_id: Sequelize.INTEGER
}, {
    tableName: 't_user',
    timestamps:false
});

(async () => {
    await User.sync();
})();

module.exports = User;