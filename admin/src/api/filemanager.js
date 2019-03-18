import fetch from './fetch';

export default {
  // 获取文件列表
  list(params) {
    return fetch.get('/file/list', params)
  },

  // 获取文件详情信息
  detail(id) {
    return fetch.get('/file/detail/' + id);
  },

  // 搜索文件
  search(params) {
    return fetch.get('/file/search', params)
  },

  // 新建文件
  create(params) {
    return fetch.post('/file/create', params);
  },

  // 删除文件
  delete(id) {
    return fetch.delete('/file/delete/' + id);
  },

  // 更新文件
  update(id,params) {
    return fetch.put('/file/update/' + id, params);
  }
}
