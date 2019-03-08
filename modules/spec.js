const db = require('../config/db')
const Sequelize = db.sequelize
const User = Sequelize.import('../schema/user.js')

User.sync({force: false});

class UserModel {
    /**
     * 创建用户
     * @param user
     * @returns {Promise<boolean>}
     */
    static async create(user) {
        let {username, password,email,company,realname,telphone,cancer,level} = user;
        console.log(user)
        await User.create({
            username,
            password,
            email,
            company,
            realname,
            telphone,
            cancer,
            level
        })
        return true
    }

    /**
     * 删除用户
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async delete(id) {
        await User.destroy({
            where: {
                id,
            }
        })
        return true
    }

    /**
     * 查询用户列表
     * @returns {Promise<*>}
     */
    static async findAllUserList() {
        return await User.findAll({
            attributes: ['id', 'username','email', 'company', 'realname', 'telphone', 'cancer', 'level']
        })
    }

    /**
     * 查询用户信息
     * @param username  姓名
     * @returns {Promise.<*>}
     */
    static async findUserByName(username) {
        return await User.findOne({
            where: {
                username
            }
        })
    }

    /**
     * 查询用户信息
     * @param username  姓名
     * @returns {Promise.<*>}
     */
    static async findUserById(id) {
        return await User.findOne({
            where: {
                id
            }
        })
    }
    /**
     * 获取管理员
     * @param username  姓名
     * @returns {Promise.<*>}
     */
    static async getAdminList() {
        return await User.findAll({
            where: {
                level:[1,2,3]
            }
        })
    }
    /**
     * 更新用户信息
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateUserInfo(id, data) {
        await User.update({
            username: data.username,
            email: data.email,
            company: data.company,
            realname: data.realname,
            telephone: data.telephone,
            cancer: data.cancer,
            score: data.score,
            level: data.level
        }, {
            where: {
                id
            },
            fields: ['username','email', 'company', 'realname', 'telephone', 'cancer', 'score', 'level']
        });
        return true
    }
}

module.exports = UserModel
