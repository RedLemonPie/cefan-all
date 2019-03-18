const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Filedb = Sequelize.import('../schema/file_db');

Filedb.sync({force: false});

class FiledbModel {
    /**
     * 创建文件
     * @param data
     * @returns {Promise<*>}
     *
     */
    static async addFile(data) {
        return await Filedb.create({
            filename: data.filename,
            file_path: data.file_path,
            product_id: data.product_id,
            file_status: data.file_status,
        })
    }

    /**
     * 更新文件数据
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateFile(file_id, data) {
        await Filedb.update({
            filename: data.filename,
            file_path: data.file_path,
            product_id: data.product_id,
            file_status: data.file_status,
        }, {
            where: {
                file_id
            }
        });
        return true
    }

    /**
     * 搜索
     * @param params
     * @return {Promise<void>}
     */
    static async search(params) {
        return await Filedb.findAll({
            raw: true,
            'order': [
                ['file_id', 'DESC']
            ],
            where: {
                title: {
                    // 模糊查询
                    [Op.like]: '%' + params.keyword + '%'
                }
            },
            attributes: {exclude: ['content']}
        })
    }

    /**
     * 获取文件列表
     * @returns {Promise<*>}
     */
    static async getFileList(params) {
        let ret = null;
        let {page = 1, product_id, file_status} = params;

       if (product_id) {
            ret = await Filedb.findAndCountAll({
                limit: 20,//每页10条
                offset: (page - 1) * 20,
                where: {
                    product_id
                },
                'order': [
                    ['product_id', 'DESC']
                ],
                attributes: {exclude: ['content']}
            });

        } else if (file_status) {
            ret = await Filedb.findAndCountAll({
                limit: 20,//每页10条
                offset: (page - 1) * 20,
                where: {
                    file_status
                },
                'order': [
                    ['file_id', 'DESC']
                ],
                attributes: {exclude: ['content']}
            });

        } else {
            ret = await Filedb.findAndCountAll({
                limit: 20,//每页10条
                offset: (page - 1) * 20,
                'order': [
                    ['file_id', 'DESC']
                ],
                attributes: {exclude: ['content']}

            });
        }

        return {
            code: 200,
            data: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 20,
                count: ret.count,
                total: ret.count,
                total_pages: Math.ceil(ret.count / 20),
            }
        }
    }

    /**
     * 获取图片详情数据
     * @param id  文件ID
     * @returns {Promise<Model>}
     */
    static async getFileDetail(file_id) {
        return await Filedb.findOne({
            where: {
                file_id,
            },
        })
    }
    /**
     * 根据productid获取图片
     * @param productid
     * @returns {Promise<Model>}
     */
    static async getFileByProduct(file_id) {
        return await Filedb.findAll({
            where: {
                file_id,
            },
        })
    }


    /**
     * 删除图片
     * @param picture_id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteFile(file_id) {
        await Filedb.destroy({
            where: {
                file_id,
            }
        })
        return true
    }

}

module.exports = FiledbModel
