const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('product', {
        // 文章ID
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_en_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        product_introduce: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        product_en_introduce: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        article_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        article_en_id: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        product_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}
