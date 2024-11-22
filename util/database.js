const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'admin123', {
    host: '172.13.152.63',
    dialect: 'postgres',
    port: 5432,
    logging: console.log,
});


module.exports = sequelize;