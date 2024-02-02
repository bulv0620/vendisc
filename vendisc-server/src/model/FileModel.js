const sequelize = require('../utils/sequelize');
const Sequelize = require('sequelize');

const File = sequelize.define('file', {
    fid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fname: Sequelize.STRING(50),
    url: Sequelize.STRING(255),
    uri: Sequelize.STRING(255),
    size: Sequelize.BIGINT,
    uid: Sequelize.INTEGER,
    timestamp: {
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    type: Sequelize.STRING(10),
    lid: Sequelize.INTEGER
}, {
    tableName: 't_file',
    timestamps:false
});

(async () => {
    await File.sync();
})();

module.exports = File