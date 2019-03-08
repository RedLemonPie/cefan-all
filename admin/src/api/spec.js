import fetch from './fetch'

export default {

  // 注册
  register(params) {
    return fetch.post('/user/register', params);
  },
  // 注册
  info() {
    return fetch.get('/user/info');
  },

  // 列表
  userList(params) {
    return fetch.get('/user/list', params);
  },
  // 列表
  adminlist(params) {
    return fetch.get('/user/adminlist', params);
  },
  // 删除
  delete(id) {
    return fetch.delete('/user/delete/' + id);
  },
  // 更新用户信息
  updateUser(params) {
    return fetch.post('/user/update/' + params.id,params);
  }

}
