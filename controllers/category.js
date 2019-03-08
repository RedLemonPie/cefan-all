const CategoryModel = require('../modules/category')
const statusCode = require('../util/status-code')

class categoryController {
    /**
     * 创建分类
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        console.log(ctx.request.body)
        let req = ctx.request.body;
        if (req.category_name) {
            try {
                const ret = await CategoryModel.createCategory(req);
                const data = await CategoryModel.getCategoryDetail(ret.category_id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('创建分类成功', data);

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    msg: '创建分类失败',
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

    /**
     * 获取分类列表
     * @returns {Promise.<void>}
     */
    static async list(ctx) {
        try {
            const data = await CategoryModel.getCategoryList();
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询分类列表成功！', data);

        } catch (e) {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412(e);
        }
    }

    /**
     * 查询ID分类下的所有文章
     * @returns {Promise.<void>}
     */
    static async getCategoryListByParent(ctx) {
        let parent_id = ctx.params.parent_id;
        // console.log(parent_id);
        if (parent_id) {
            try {
                const data = await CategoryModel.getCategoryListByParent(parent_id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('查询成功！', data);

            } catch (e) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412(e);
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412({
                msg: '请检查参数！'
            })
        }
    }
    /**
     * 查询ID分类下的所有文章
     * @returns {Promise.<void>}
     */
    static async getCategoryArticle(ctx) {
        let category_id = ctx.params.category_id;
        console.log(category_id);
        if (category_id) {
            try {
                const data = await CategoryModel.getCategoryProductList(category_id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('查询成功！', data);

            } catch (e) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412(e);
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412({
                msg: '请检查参数！'
            })
        }
    }

    /**
     * 查询单条分类数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let category_id = ctx.params.category_id;

        if (category_id) {
            try {
                let data = await CategoryModel.getCategoryDetail(category_id);
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
            ctx.body = statusCode.ERROR_412('分类category_id必须传');
        }
    }


    /**
     * 删除分类数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        let category_id = ctx.params.category_id;

        if (category_id && !isNaN(category_id)) {
            try {
                await CategoryModel.deleteCategory(category_id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('删除分类成功！');

            } catch (err) {
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200({
                    msg: '删除分类失败',
                    err,
                });

            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('分类category_id必须传！');
        }
    }

    /**
     * 更新分类数据
     * @param ctx
     * @returns {Promise.<vocategory_id>}
     */
    static async update(ctx) {
        let req = ctx.request.body;
        let category_id = ctx.params.category_id;

        if (req) {
            await CategoryModel.updateCategory(category_id, req);
            let data = await CategoryModel.getCategoryDetail(category_id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('更新分类成功！', data);
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('更新分类失败！')
        }
    }
}

module.exports = categoryController
