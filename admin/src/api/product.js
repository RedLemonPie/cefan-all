import fetch from './fetch';

export default {
  // 获取产品列表
  list(params) {
    return fetch.get('/product/list', params)
  },

  // 获取产品详情信息
  detail(id) {
    return fetch.get('/product/detail/' + id);
  },

  // 搜索产品
  search(params) {
    return fetch.get('/product/search', params)
  },

  // 新建产品
  create(params) {
    return fetch.post('/product/create', params);
  },

  // 删除产品
  delete(id) {
    return fetch.delete('/product/delete/' + id);
  },

  // 更新产品
  update(params) {
    console.log(params)
    return fetch.put('/product/update/' + params.id, params);
  },


}
