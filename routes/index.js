const Router = require('koa-router')
const UserController = require('../controllers/user')
const ArticleController = require('../controllers/article')
const CategoryController = require('../controllers/category')
const PictureController = require('../controllers/picture')
const ProductController = require('../controllers/product')
const FiledbController = require('../controllers/filedb')
// const FilemanagerController = require('../controllers/filemanager')
const server = 'http://localhost:3000/upload/';
const router = new Router({
    prefix: '/api/v1'
})


//上传文件
router.post('/upload',async (ctx)=>{
    // console.log(ctx.request.files);
    let url = server + ctx.uploadpath.file;
    ctx.request.files.url = url
    ctx.body = JSON.stringify(ctx.request.files);
});
/**
 * 用户接口
 */
// 用户注册
router.post('/user/register', UserController.create);
// 用户登录
router.post('/user/login', UserController.login);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
router.get('/user/info', UserController.getUserInfo);
// 获取用户列表
router.get('/user/list', UserController.getUserList);
// 获取管理员列表
router.get('/user/adminlist', UserController.getAdminList);
// 修改用户信息
router.post('/user/update/:id', UserController.update);

/**
 * 文章接口
 */
// 创建文章
router.post('/article/create', ArticleController.create);
// 获取文章详情
router.get('/article/detail/:id', ArticleController.detail);
// 删除文章
router.delete('/article/delete/:id', ArticleController.delete);
// 更改文章
router.put('/article/update/:id', ArticleController.update);
// 获取文章列表
router.get('/article/list', ArticleController.list);
// 搜索文章
router.get('/article/search', ArticleController.search)


// 创建产品
router.post('/product/create', ProductController.create);
// 获取产品
router.get('/product/detail/:product_id', ProductController.detail);
// 删除产品
router.delete('/product/delete/:product_id', ProductController.delete);
// 更改产品
router.put('/product/update/:id', ProductController.update);
// 获取产品列表
router.get('/product/list', ProductController.list);
// 搜索文章
router.get('/article/search/:product_name', ProductController.findbyname)

/**
 * 规格接口
 */
// 增加规格
// router.get('/category/article/list/:id', SpecController.getCategoryArticle);
// 修改规格
// 删除规格
// 规格列表
//
router.get('/category/article/list/:id', CategoryController.getCategoryArticle);
/**
 * 图片接口
 */
// 增加图片
router.post('/picture/create/', PictureController.addPicture);
// 修改图片
router.put('/picture/update/:id', PictureController.updatePicture);
// 删除图片
router.delete('/picture/delete/:picture_id', PictureController.delPicture);
// 图片列表
router.get('/picture/list/', PictureController.getPictureList);
// 图片详情
router.get('/picture/detail/:id', PictureController.getPictureDetail);
// 根据产品id获取图片

// 根据分类获取图片
router.post('/file/create/', FiledbController.addFile);
// 修改图片
router.put('/file/update/:id', FiledbController.updateFile);
// 删除图片
router.delete('/file/delete/:file_id', FiledbController.delFile);
// 图片列表
router.get('/file/list/', FiledbController.getFileList);
// 图片详情
router.get('/file/detail/:id', FiledbController.getFileDetail);

/**
 * 分类接口
 */
// 创建分类
router.post('/category/create', CategoryController.create);
// 获取分类详情
router.get('/category/detail/:id', CategoryController.detail);
// 删除分类
router.delete('/category/delete/:id', CategoryController.delete);
// 更改分类
router.put('/category/update/:id', CategoryController.update);
// 获取分类列表
router.get('/category/list', CategoryController.list);
// 获取分类列表
router.get('/category/list/:parent_id', CategoryController.getCategoryListByParent);
// 查询分类ID下的所有文章列表
router.get('/category/article/list/:id', CategoryController.getCategoryArticle);

module.exports = router



