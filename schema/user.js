const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        company: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        realname: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        telphone: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        cancer: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
