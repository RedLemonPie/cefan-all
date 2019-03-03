const PictureModel = require('../modules/PictureModel')
const db = require('../config/db');
const Sequelize = db.sequelize;
// const Category = Sequelize.import('../schema/category');

const statusCode = require('../util/status-code')

class PictureController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async addPicture(ctx) {
        let req = ctx.request.body;

        if (req.picture_title
            && req.picture_url
            && req.picture_status
            && req.picture_position
            && req.product_ID
        ) {
            try {

                const ret = await PictureModel.addPicture(req);
                const data = await PictureModel.getPictureDetail(ret.picture_id);

                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('增加图片成功', data);

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    msg: '添加失败',
                    err,
                })
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412({
                msg: '请检查参数！'
            })
        }
    }
    //
    // static async search(ctx) {
    //     try {
    //         let data = await ArticleModel.search(ctx.query);
    //         ctx.response.status = 200;
    //         ctx.body = statusCode.SUCCESS_200('查询文章成功！', data)
    //     } catch (e) {
    //         console.log(e);
    //         ctx.response.status = 412;
    //         ctx.body = statusCode.ERROR_412(e);
    //     }
    // }

    /**
     * 获取文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getPictureList(ctx) {
        let params = ctx.query;
        try {
            const data = await PictureModel.getPictureList(params);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询文章列表成功！', data)
        } catch (e) {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412(e);
        }
    }

    /**
     * 查询单条文章数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getPictureDetail(ctx) {
        let id = ctx.params.id;

        if (id) {
            try {
                let data = await ArticleModel.getArticleDetail(id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('查询成功！', {
                    data
                });

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    mgs: '查询失败',
                    err,
                })
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('文章ID必须传');
        }
    }


    /**
     * 删除文章数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delPicture(ctx) {
        let picture_id = ctx.params.picture_id;

        if (picture_id && !isNaN(picture_id)) {
            try {
                await PictureModel.deletePicture(picture_id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('删除成功！');

            } catch (err) {
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200({
                    msg: '删除失败',
                    err,
                });

            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('图片ID必须传！');
        }
    }

    /**
     * 更新导航条数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async updatePicture(ctx) {
        let req = ctx.request.body;
        let picture_id = ctx.params.picture_id;

        if (req) {
            await PictureModel.updatePicture(picture_id, req);
            let data = await PictureModel.getPictureDetail(picture_id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('更新图片成功！', data);
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('更新图片失败！')
        }
    }
}

module.exports = PictureController
