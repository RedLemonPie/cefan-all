import fetch from './fetch';

export default {
  // 获取文章列表
  list(params) {
    return fetch.get('/product/list', params)
  },

  // 获取文章详情信息
  detail(id) {
    return fetch.get('/article/detail/' + id);
  },

  // 搜索文章
  search(params) {
    return fetch.get('/product/search', params)
  },

  // 新建文章
  create(params) {
    return fetch.post('/product/create', params);
  },

  // 删除文章
  delete(id) {
    return fetch.delete('/product/delete/' + id);
  },

  // 更新文章
  update(params) {
    return fetch.put('/product/update/' + params.id, params);
  },

  // 更新文章
  updateFile(params) {
    return fetch.put('/product/updatefile/' + params.id, params);
  },
  // 更新文章
  updateSpec(params) {
    return fetch.put('/product/updatespec/' + params.id, params);
  },

}
