const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('article', {
        // 文章ID
        article_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 文章标题
        article_title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'article_title',
        },
        // 是否启用
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        // 文章介绍
        introduce: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'introduce'
        },
        // 文章分类
        category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'category'
        },
        // 文章封面
        banner: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'banner'
        },
        // 文章内容
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content'
        },
        // 浏览次数
        browser: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'browser',
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
