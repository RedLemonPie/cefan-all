const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('file_db', {
        // 文章ID
        file_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 文章标题
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'filename',
        },
        file_path: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'file_path',
        },
        product_id: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'product_id',
            defaultValue: 0
        },
        file_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'file_status',
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
            }
        },
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,

    })

}
