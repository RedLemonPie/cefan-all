const Koa = require('koa')
const path = require('path');
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koabody = require('koa-body')
const jwt = require('koa-jwt')
const logger = require('koa-logger')
const cors = require('koa-cors');
const index = require('./routes/index')
const secret = require('./config/secret')
const err = require('./middlreware/error')
const { applogger, accessLogger } = require('./config/log4j');

const getUploadFileExt = require('./util/getUploadFileExt');
const getUploadFileName = require('./util/getUploadFileName');
const checkDirExist = require('./util/checkDirExist');
const getUploadDirName = require('./util/getUploadDirName');
//上传文件
// error handler
onerror(app)

app.use(err())
app.use(cors());

app.use(accessLogger());
app.on('error', err => {
    applogger.error(err);
});
// 此接口列表，过滤不用jwt验证
app.use(jwt({secret: secret.sign}).unless({
    path: [
        /^\/public/,
        // 文章详情
        /^\/api\/v1\/article\/detail/,
        // 上传文件
        /^\/api\/v1\/upload/,
        /^\/upload/,
        // 文章列表
        /^\/api\/v1\/article\/list/,
        // 登录
        /^\/api\/v1\/user\/login/,
        // 创建用户
        /^\/api\/v1\/user\/register/,
        // 分类列表
        /^\/api\/v1\/category\/list/,
        // 文章搜索
        /^\/api\/v1\/article\/search/,
        // 分类
        /^\/api\/v1\/category\/article\/list/
    ]
}))

// middlewares
// app.use(bodyparser({
//     enableTypes: ['json', 'form', 'text']
// }))
app.use(koabody({
    enableTypes: ['json', 'form', 'text'],
    multipart: true, // 支持文件上传
    stict: false,
    // encoding: 'gzip',
    formidable: {
        uploadDir: path.join(__dirname, 'public/upload'),
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024,
        onFileBegin: (name, file) => {
            // console.log(file);
            // 获取文件后缀
            const ext = getUploadFileExt(file.name);
            // 最终要保存到的文件夹目录
            const dirName = getUploadDirName();
            const dir = path.join(__dirname, `public/upload/${dirName}`);
            // 检查文件夹是否存在如果不存在则新建文件夹
            checkDirExist(dir);
            // 获取文件名称
            const fileName = getUploadFileName(ext);
            // 重新覆盖 file.path 属性
            file.path = `${dir}/${fileName}`;
            app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
            app.context.uploadpath[name] = `${dirName}/${fileName}`;
        },
}}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
