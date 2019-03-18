import fetch from './fetch';

export default {
  // 获取图片列表
  list(params) {
    return fetch.get('/picture/list', params)
  },

  // 获取图片详情信息
  detail(id) {
    return fetch.get('/picture/detail/' + id);
  },

  // 搜索图片
  search(params) {
    return fetch.get('/picture/search', params)
  },

  // 新建图片
  create(params) {
    return fetch.post('/picture/create', params);
  },

  // 删除图片
  delete(id) {
    return fetch.delete('/picture/delete/' + id);
  },

  // 更新图片
  update(id,params) {
    return fetch.put('/picture/update/' + id, params);
  }
}
