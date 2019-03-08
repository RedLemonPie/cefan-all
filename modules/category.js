const db = require('../config/db');
const Sequelize = db.sequelize;
const Category = Sequelize.import('../schema/category');
const Product = Sequelize.import('../schema/Product');

Category.sync({force: false});

class CategoryModel {
    /**
     * 创建分类
     * @param data
     * @returns {Promise<*>}
     */
    static async createCategory(data) {
        console.log(data)
        return await Category.create({
            category_name: data.category_name,
            parent_id: data.parent_id
        })
    }

    /**
     * 更新分类数据
     * @param id  分类ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateCategory(category_id, data) {
        await Category.update({
            category_name: data.category_name,
            parnet_id: data.parnet_id
        }, {
            where: {
                category_id
            },
            fields: ['category_name','parnet_id']
        });
        return true
    }

    /**
     * 获取分类列表
     * @returns {Promise<*>}
     */
    static async getCategoryList() {
        return await Category.findAll({
            attributes: ['category_id', 'category_name','parent_id'],
        })
    }

    /**
     * 获取节点分类列表
     * @returns {Promise<*>}
     */
    static async getCategoryListByParent(parent_id) {
        return await Category.findAll({
            where:{
                parent_id
            },
            attributes: ['category_id', 'category_name','parent_id'],
        })
    }



    // 查询ID分类下的所有文章
    static async getCategoryProductList(category_id) {
        return await Category.findAll({
            where: {
                category_id,
            },
            include: [{
                model: Product
            }]
        })
    }

    /**
     * 获取分类详情数据
     * @param category_id  文章ID
     * @returns {Promise<Model>}
     */
    static async getCategoryDetail(category_id) {
        return await Category.findOne({
            where: {
                category_id,
            },
        })
    }

    /**
     * 删除分类
     * @param category_id
     * @returns {Promise.<boolean>}
     */
    static async deleteCategory(category_id) {
        await Category.destroy({
            where: {
                category_id,
            }
        })
        return true
    }

}

module.exports = CategoryModel
