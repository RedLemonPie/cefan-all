const db = require('../config/db')
const Sequelize = db.sequelize
const Product = Sequelize.import('../schema/Product.js')

const Category = Sequelize.import('../schema/category');

Category.hasMany(Product); // 将会添加 categoryId 到 Article 模型
Product.belongsTo(Category, {foreignKey: 'category_id', constraints: false});

Product.sync({force: false});

class ProductModel {
    /**
     * 创建用户
     * @param user
     * @returns {Promise<boolean>}
     */
    static async create(product) {
        let {product_name,product_en_name,product_introduce,product_en_introduce,article_id,article_en_id,category_id,product_status} = product;
        console.log(product)
        await Product.create({
            product_name,product_en_name,product_introduce,product_en_introduce,article_id,article_en_id,category_id,product_status
        })
        return true
    }

    /**
     * 删除用户
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async delete(product_id) {
        await Product.destroy({
            where: {
                product_id,
            }
        })
        return true
    }

    /**
     * 查询用户列表
     * @returns {Promise<*>}
     */
    static async findAllProduct() {
        return await Product.findAll({
            attributes: ['product_name','product_en_name','product_introduce','product_en_introduce','article_id','article_en_id','category_id','product_status'
            ]
        })
    }

    /**
     * 查询用户信息
     * @param username  姓名
     * @returns {Promise.<*>}
     */
    static async findProductByName(product_name) {
        return await Product.findOne({
            where: {
                product_name
            }
        })
    }

    /**
     * 查询用户信息
     * @param username  姓名
     * @returns {Promise.<*>}
     */
    static async findProductById(product_id) {
        return await Product.findOne({
            where: {
                product_id
            }
        })
    }

    /**
     * 更新用户信息
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateProductInfo(product_id, data) {
        await Product.update({
            product_name: data.product_name,
            product_en_name: data.product_en_name,
            product_introduce: data.product_introduce,
            product_en_introduce: data.product_en_introduce,
            article_id: data.article_id,
            article_en_id: data.article_en_id,
            category_id: data.category_id,
            product_status: data.product_status
        }, {
            where: {
                product_id
            },
            fields: ['product_name','product_en_name','product_introduce','product_en_introduce','article_id','article_en_id','category_id','product_status']
        });
        return true
    }
}

module.exports = ProductModel
