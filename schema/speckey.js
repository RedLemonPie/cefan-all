const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('speckey', {
        // 文章ID
        speckey_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 文章标题
        speckey_name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'title',
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    })

}
