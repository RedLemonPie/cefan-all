<template>
  <!--list-->
  <!--@author: 梁凤波-->
  <!--@date  2018/11/22 22:16-->
  <section class="list-wrap">
    <div class="list" v-if="list.length > 0">
      <Table border :columns="columns" :data="list"></Table>
    </div>
    <div class="model">
      <Modal
        v-model="showModel"
        title="提示"
        @on-ok="remove(id)">
        <p>确定删除分类吗</p>
      </Modal>
    </div>

    <!--<Tree :data="treeData" :load-data="loadData" :render="renderContent"></Tree>-->

  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        // 文章ID
        id: '',
        parentlist:[],
        showModel: false,
        treeData: [],
        list: [],
        columns: [
          {
            title: 'ID',
            key: 'category_id',
            width: 80,
            align: 'center'
          },
          {
            title: '分类名称',
            key: 'category_name'
          },
          {
            title: '父分类序号',
            key: 'parent_id'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.update(params.row.id);
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.id = params.row.id;
                      this.showModel = true;
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
      }
    },
    computed: {
      ...mapState({})
    },
    mounted(){
      this.getListByParent(0)
    },
    created() {
      this.getCategory()
    },
    methods: {
      ...mapActions({
        getCategoryList: 'category/getCategoryList',
        deleteCategory: 'category/deleteCategory',
        getCategoryListByParent: 'category/getCategoryListByParent'
      }),

      async loadData (item, callback) {
        let parent_id = item.id || 0
        let data = []
        try {
          this.list = await this.getListByParent(parent_id)
          console.log(this.list)
          data = this.getTree(this.list)
          callback(data)
          this.$Message.success('获取分类成功！');
        } catch (e) {
          this.$Message.error('获取分类失败！');
        }
      },
      getTree (tree = []) {
        let arr = [];
        console.log(tree)
        if (tree.length !== 0) {
          tree.forEach(item => {
            let obj = {};
            obj.category_name = item.category_name;
            obj.category_id = item.category_id; // 其他你想要添加的属性
            obj.parent_id = item.parent_id; // 其他你想要添加的属性
            if(item.child === 1) {
              obj.children = [];
              obj.loading = false;
            }
            arr.push(obj);
          });
        }
        return arr
      },
      renderContent (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span',[
            h('Icon', {
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.category_name)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('Button', {
              props: Object.assign({},  {
                type: 'primary',
                size: 'small',
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => { this.albumCategoryAdd(data) }
              }
            }, '添加'),
            h('Button', {
              props: Object.assign({},  {
                type: 'primary',
                size: 'small',
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => { this.update(data) }
              }
            }, '编辑'),
          ])
        ]);
      },

      async getListByParent(parent_id){
        try {
          this.parentlist = await this.getCategoryListByParent(parent_id);
          this.treeData = this.getTree(this.parentlist)
          console.log(this.treeData)
          this.$Message.success('获取'+parent_id+'分类成功！');
        } catch (e) {
          this.$Message.error('获取'+parent_id+'分类失败！');
        }
      },
      // 获取用户列表
      async getCategory() {
        try {
          this.list = await this.getCategoryList();
          this.$Message.success('获取分类成功！');

        } catch (e) {
          this.$Message.error('获取分类失败！');
        }
      },
      // 更新分类
      async update(id) {
        this.$router.push("/category/update/" + id);
      },

      // 移除分类
      async remove(id) {
        try {
          await this.deleteCategory(id);
          this.$Message.success('删除分类成功');
          this.getCategory();

        } catch (e) {
          this.$Message.error('删除分类失败');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
