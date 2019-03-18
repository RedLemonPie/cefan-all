const FileModel = require('../modules/filedb')
const db = require('../config/db');
const Sequelize = db.sequelize;

const statusCode = require('../util/status-code')

class FileController {
    /**
     * 创建文件
     * @param ctx
     * @returns {Promise.<void>}
     */
        static async addFile(ctx) {
        let req = ctx.request.body;

        if (req.filename
            && req.file_path
            && req.file_status
        ) {
            try {
                const ret = await FileModel.addFile(req);
                const data = await FileModel.getFileDetail(ret.file_id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('增加文件成功', data);

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
    //         ctx.body = statusCode.SUCCESS_200('查询文件成功！', data)
    //     } catch (e) {
    //         console.log(e);
    //         ctx.response.status = 412;
    //         ctx.body = statusCode.ERROR_412(e);
    //     }
    // }

    /**
     * 获取文件列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getFileList(ctx) {
        let params = ctx.query;
        try {
            const data = await FileModel.getFileList(params);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询文件列表成功！', data)
        } catch (e) {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412(e);
        }
    }

    /**
     * 查询单条文件数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getFileDetail(ctx) {
        let file_id = ctx.params.file_id;

        if (file_id) {
            try {
                let data = await FileModel.getFileDetail(file_id);
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
            ctx.body = statusCode.ERROR_412('文件ID必须传');
        }
    }


    /**
     * 删除文件数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delFile(ctx) {
        let file_id = ctx.params.file_id;

        if (file_id && !isNaN(file_id)) {
            try {
                await FileModel.deleteFile(file_id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('删除成功！');

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.SUCCESS_200({
                    msg: '删除失败',
                    err,
                });

            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('文件ID必须传！');
        }
    }

    /**
     * 更新导航条数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async updateFile(ctx) {
        let req = ctx.request.body;
        let file_id = ctx.params.file_id;

        if (req) {
            await FileModel.updateFile(file_id, req);
            let data = await FileModel.getFileDetail(file_id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('更新文件成功！', data);
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('更新文件失败！')
        }
    }
}

module.exports = FileController
