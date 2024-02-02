const sequelize = require('../utils/sequelize');
const Sequelize = require('sequelize');

const Folder = sequelize.define('folder', {
    fdid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fdname: Sequelize.STRING(50),
    uid: Sequelize.INTEGER,
    timestamp: {
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    lid: Sequelize.INTEGER
}, {
    tableName: 't_folder',
    timestamps:false
});

(async () => {
    await Folder.sync();
})();

module.exports = Folder