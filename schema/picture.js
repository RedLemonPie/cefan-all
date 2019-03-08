const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('picture', {
        // 图片ID
        picture_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 图片标题
        picture_title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'picture_title',
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'picture_url',
        },
        // 显示判断
        picture_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'picture_status',
        },
        // 图片位置  0 无 1 banner 2 广告位 3 广告位 4 产品
        picture_position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'picture_position',
        },
        product_ID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'product_id',
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
