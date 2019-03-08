import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // 哈斯
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // 兼容
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      // 首页
      path: '/',
      component(resolve) {
        require(['../views/main/app.vue'], resolve);
      },
      children: [
        {
          // 管理员列表
          path: 'user/admin',
          name: 'adminList',
          meta: {
            name: '管理员权限',
            icon: 'md-lock'
          },
          component(resolve) {
            require(['../views/user/admin.vue'], resolve);
          }
        },
        {
          // 用户列表
          path: 'user/user',
          name: 'userList',
          meta: {
            name: '用户权限',
            icon: 'md-lock'
          },
          component(resolve) {
            require(['../views/user/user.vue'], resolve);
          }
        },
        {
          // 管理员信息
          path: 'user/index',
          name: 'userIndex',
          meta: {
            name: '首页',
            icon: 'md-list'
          },
          component(resolve) {
            require(['../views/user/index.vue'], resolve);
          }
        },
        {
          // 文章列表
          path: 'article/list',
          name: 'articleList',
          meta: {
            name: '文章列表',
            icon: 'md-list'
          },
          component(resolve) {
            require(['../views/article/list.vue'], resolve);
          },
        },
        {
          // 新增文章
          path: 'article/create',
          name: 'articleCreate',
          meta: {
            name: '新增文章',
            icon: 'md-add'
          },
          component(resolve) {
            require(['../views/article/create.vue'], resolve);
          }
        },
        {
          // 更新文章
          path: 'article/update/:id',
          name: 'articleCreate',
          meta: {
            name: '更新文章',
            icon: 'md-book'
          },
          component(resolve) {
            require(['../views/article/update.vue'], resolve);
          }
        },
        {
          // 分类列表
          path: 'category/list',
          name: 'categoryList',
          meta: {
            name: '分类列表',
            icon: 'md-list'
          },
          component(resolve) {
            require(['../views/category/list.vue'], resolve);
          }
        },
        {
          // 新增分类
          path: 'category/create',
          name: 'categoryCreate',
          meta: {
            name: '新增分类',
            icon: 'md-add'
          },
          component(resolve) {
            require(['../views/category/create.vue'], resolve);
          }
        },
        {
          // 文件管理
          path: 'filemanager/list ',
          name: 'filemanager',
          meta: {
            name: '文件管理',
            icon: 'md-book'
          },
          component(resolve) {
            require(['../views/filemanager/filemanager.vue'], resolve);
          }
        },
        {
          // 图片管理
          path: 'picture/list',
          name: 'picture',
          meta: {
            name: '更新分类',
            icon: 'md-book'
          },
          component(resolve) {
            require(['../views/picture/picture.vue'], resolve);
          }
        },
        {
          // 产品管理
          path: 'product/list',
          name: 'product',
          meta: {
            name: '产品管理',
            icon: 'md-book'
          },
          component(resolve) {
            require(['../views/product/product.vue'], resolve);
          }
        },
        {
          // 规格管理
          path: 'product/spec',
          name: 'spec',
          meta: {
            name: '规格管理',
            icon: 'md-book'
          },
          component(resolve) {
            require(['../views/product/spec.vue'], resolve);
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        inLoginPage: true
      },
      component(resolve) {
        require(['../views/user/login.vue'], resolve);
      }
    }
  ]
})
