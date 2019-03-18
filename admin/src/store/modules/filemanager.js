import filemanager from '../../api/filemanager'

const state = {
  // 文件列表
  pictureList: [],
  // 推荐文件列表
  recommendFileList: [],
  // 页码
  pagination: null,
  // 文件详情
  pictureDetail: null
};

const mutations = {
  // 设置文件列表
  SET_FILE_LIST(state, data) {
    state.pictureList = data
  },
  // 推荐文件列表
  SET_RECOMMEND_FILE_LIST(state, data) {
    state.recommendFileList = data
  },
  // 文件详情
  SET_FILE_DETAIL(state, data) {
    state.pictureDetail = data;
  }
};

const actions = {
  /**
   * 获取文件列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async FileList({state, commit}, params) {
    let ret = await filemanager.list(params);
    commit("SET_FILE_LIST", ret.data.data);

    return ret.data.data;
  },

  /**
   * 创建文件
   * @param state
   * @param commit
   * @param params
   */
  async createFile({state, commit}, params) {
    return await filemanager.create(params);
  },

  /**
   * 删除文件
   * @param state
   * @param commit
   * @param id
   * @return {Promise<void>}
   */
  async deleteFile({state, commit}, id) {
    return await filemanager.delete(id);
  },

  /**
   * 更新文件
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async updateFile({state, commit},params) {
    return await filemanager.update(params.id,params);
  },

  /**
   * 获取文件详情信息
   * @param state
   * @param commit
   * @param id 文件ID
   * @returns {Promise<void>}
   */
  async getFileDetail({state, commit}, id) {
    const ret = await filemanager.detail(id);
    commit("SET_FILE_DETAIL", ret.data.data.data);

    return ret.data.data.data;
  },

  /**
   * 搜索文件
   * @param state
   * @param commit
   * @param params
   * @return {Promise<void>}
   */
  async searchFile({state, commit}, params) {
    let ret = await filemanager.search(params);
    return ret.data.data;
  },

  /**
   * 搜索推荐文件
   * @param state
   * @param commit
   * @param params
   * @return {Promise<*>}
   */
  async recommendFile({state, commit}, params) {
    if (state.recommendFileList.length > 0) {
      return state.recommendFileList;
    } else {
      let ret = await filemanager.list(params);
      commit("SET_RECOMMEND_FILE_LIST", ret.data.data.data);

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
