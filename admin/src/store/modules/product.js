import product from '../../api/product'

const state = {
  // 产品列表
  productList: [],
  // 推荐产品列表
  // recommendProductList: [],
  // 页码
  pagination: null,
  // 产品详情
  productDetail: null
};

const mutations = {
  // 设置产品列表
  SET_PRODUCT_LIST(state, data) {
    state.productList = data
  },
  // 推荐产品列表
  SET_RECOMMEND_PRODUCT_LIST(state, data) {
    state.recommendProductList = data
  },
  // 产品详情
  SET_PRODUCT_DETAIL(state, data) {
    state.productDetail = data;
  }
};

const actions = {
  /**
   * 获取产品列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async productList({state, commit}, params) {
    let ret = await product.list(params);
    commit("SET_PRODUCT_LIST", ret.data.data);

    return ret.data.data;
  },

  /**
   * 创建产品
   * @param state
   * @param commit
   * @param params
   */
  async createProduct({state, commit}, params) {
    return await product.create(params);
  },

  /**
   * 删除产品
   * @param state
   * @param commit
   * @param id
   * @return {Promise<void>}
   */
  async deleteProduct({state, commit}, id) {
    return await product.delete(id);
  },

  /**
   * 更新产品
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async updateProduct({state, commit},params) {
    return await product.update(params);
  },

  /**
   * 获取产品详情信息
   * @param state
   * @param commit
   * @param id 产品ID
   * @returns {Promise<void>}
   */
  async getProductDetail({state, commit}, id) {
    const ret = await product.detail(id);
    commit("SET_PRODUCT_DETAIL", ret.data.data.data);

    return ret.data.data.data;
  },

  /**
   * 搜索产品
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async searchProduct({state, commit}, params) {
    let ret = await product.search(params);
    return ret.data.data;
  },

  /**
   * 搜索推荐产品
   * @param state
   * @param commit
   * @param params
   * @return {Promise<*>}
   */
  async recommendProduct({state, commit}, params) {
    if (state.recommendProductList.length > 0) {
      return state.recommendProductList;
    } else {
      let ret = await product.list(params);
      commit("SET_RECOMMEND_PRODUCT_LIST", ret.data.data.data);

      return ret.data.data;
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
