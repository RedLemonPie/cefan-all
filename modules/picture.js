const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Picture = Sequelize.import('../schema/picture');

Picture.sync({force: false});

class PictureModel {
    /**
     * 创建文章
     * @param data
     * @returns {Promise<*>}
     *
     */
    static async addPicture(data) {
        return await Picture.create({
            picture_title: data.picture_title,
            picture_url: data.picture_url,
            picture_status: data.picture_status,
            picture_position: data.picture_position,
            product_ID: data.product_ID,
        })
    }

    /**
     * 更新文章数据
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updatePicture(picture_id, data) {
        await Picture.update({
            picture_title: data.picture_title,
            picture_url: data.picture_url,
            picture_status: data.picture_status,
            picture_position: data.picture_position,
            product_ID: data.product_ID,
        }, {
            where: {
                picture_id
            },
            fields: ['picture_title', 'picture_url', 'picture_status', 'picture_position', 'product_ID', 'content', 'recommend']
        });
        return true
    }

    // /**
    //  * 搜索
    //  * @param params
    //  * @return {Promise<void>}
    //  */
    // static async search(params) {
    //     return await Article.findAll({
    //         raw: true,
    //         'order': [
    //             ['id', 'DESC']
    //         ],
    //         where: {
    //             title: {
    //                 // 模糊查询
    //                 [Op.like]: '%' + params.keyword + '%'
    //             }
    //         },
    //         attributes: {exclude: ['content']}
    //     })
    // }

    /**
     * 获取文章列表
     * @returns {Promise<*>}
     */
    static async getPictureList(params) {
        let ret = null;
        let {page = 1, picture_position, product_ID, picture_status} = params;

        if (picture_position) {
            ret = await Picture.findAndCountAll({
                limit: 20,//每页10条
                offset: (page - 1) * 20,
                where: {
                    position: position
                },
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: ['content']}
            });

        } else if (product_ID) {
            ret = await Picture.findAndCountAll({
                limit: 20,//每页10条
                offset: (page - 1) * 20,
                where: {
                    product_ID
                },
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: ['content']}
            });

        } else if (picture_status) {
            ret = await Picture.findAndCountAll({
                limit: 20,//每页10条
                offset: (page - 1) * 20,
                where: {
                    picture_status
                },
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: ['content']}
            });

        } else {
            ret = await Picture.findAndCountAll({
                limit: 20,//每页10条
                offset: (page - 1) * 20,
                'order': [
                    ['id', 'DESC']
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
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getPictureDetail(picture_id) {
        return await Picture.findOne({
            where: {
                picture_id,
            },
        })
    }
    /**
     * 根据productid获取图片
     * @param productid
     * @returns {Promise<Model>}
     */
    static async getPictureByProduct(product_id) {
        return await Picture.findAll({
            where: {
                product_id,
            },
        })
    }
    /**
     * 根据position获取图片
     * @param position
     * @returns {Promise<Model>}
     */
    static async getPictureByPosition(picture_position) {
        return await Picture.findAll({
            where: {
                picture_position,
            },
        })
    }

    /**
     * 删除图片
     * @param picture_id listID
     * @returns {Promise.<boolean>}
     */
    static async deletePicture(picture_id) {
        await Picture.destroy({
            where: {
                picture_id,
            }
        })
        return true
    }

}

module.exports = PictureModel
