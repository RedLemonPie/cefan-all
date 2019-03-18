import picture from '../../api/picture'

const state = {
  // 图片列表
  pictureList: [],
  // 推荐图片列表
  recommendPictureList: [],
  // 页码
  pagination: null,
  // 图片详情
  pictureDetail: null
};

const mutations = {
  // 设置图片列表
  SET_PICTURE_LIST(state, data) {
    state.pictureList = data
  },
  // 推荐图片列表
  SET_RECOMMEND_PICTURE_LIST(state, data) {
    state.recommendPictureList = data
  },
  // 图片详情
  SET_PICTURE_DETAIL(state, data) {
    state.pictureDetail = data;
  }
};

const actions = {
  /**
   * 获取图片列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async pictureList({state, commit}, params) {
    let ret = await picture.list(params);
    commit("SET_PICTURE_LIST", ret.data.data);

    return ret.data.data;
  },

  /**
   * 创建图片
   * @param state
   * @param commit
   * @param params
   */
  async createPicture({state, commit}, params) {
    return await picture.create(params);
  },

  /**
   * 删除图片
   * @param state
   * @param commit
   * @param id
   * @return {Promise<void>}
   */
  async deletePicture({state, commit}, id) {
    return await picture.delete(id);
  },

  /**
   * 更新图片
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async updatePicture({state, commit},params) {
    return await picture.update(params.id,params);
  },

  /**
   * 获取图片详情信息
   * @param state
   * @param commit
   * @param id 图片ID
   * @returns {Promise<void>}
   */
  async getPictureDetail({state, commit}, id) {
    const ret = await picture.detail(id);
    commit("SET_PICTURE_DETAIL", ret.data.data.data);

    return ret.data.data.data;
  },

  /**
   * 搜索图片
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async searchPicture({state, commit}, params) {
    let ret = await picture.search(params);
    return ret.data.data;
  },

  /**
   * 搜索推荐图片
   * @param state
   * @param commit
   * @param params
   * @return {Promise<*>}
   */
  async recommendPicture({state, commit}, params) {
    if (state.recommendPictureList.length > 0) {
      return state.recommendPictureList;
    } else {
      let ret = await picture.list(params);
      commit("SET_RECOMMEND_PICTURE_LIST", ret.data.data.data);

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
