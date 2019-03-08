const ProductModel = require('../modules/product')
const db = require('../config/db');
const Sequelize = db.sequelize;
const statusCode = require('../util/status-code')

class productController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        let req = ctx.request.body;

        if (req.product_name
        ) {
            try {
                const ret = await ProductModel.create(req);
                const data = await ProductModel.findProductById(ret.product_id);

                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('创建文章成功', data);

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    msg: '创建失败',
                    err,
                })
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412({
                msg: '请检查参数2！'
            })
        }
    }

    // static async search(ctx) {
    //     try {
    //         let data = await ProductModel.(ctx.query);
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
    static async list(ctx) {
        try {
            const data = await ProductModel.findAllProduct();
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
    static async detail(ctx) {
        let product_id = ctx.params.product_id;

        if (product_id) {
            try {
                let data = await ProductModel.findProductById(product_id);
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
    static async delete(ctx) {
        let product_id = ctx.params.product_id;

        if (product_id && !isNaN(product_id)) {
            try {
                await ProductModel.delete(product_id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('删除产品成功！');

            } catch (err) {
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200({
                    msg: '删除失败',
                    err,
                });

            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('产品ID必须传！');
        }
    }

    /**
     * 更新导航条数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        let req = ctx.request.body;
        let product_id = ctx.params.product_id;

        if (req) {
            await ProductModel.updateProductInfo(product_id, req);
            let data = await ProductModel.findProductById(product_id    );

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('更新文章成功！', data);
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('更新文章失败！')
        }
    }
}

module.exports = productController
