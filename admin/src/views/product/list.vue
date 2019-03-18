<template>

  <section class="list-wrap">
    <div class="list" v-if="list.length >= 0">
      <Table border :columns="columns" :data="list"></Table>
    </div>
    <div class="model">
      <Modal
        v-model="showModel"
        title="提示"
        @on-ok="remove(product_id)">
        <p>确定删除该产品么吗</p>
      </Modal>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        // 产品ID
        product_id: '',
        showModel: false,
        list: [],
        columns: [
          {
            title: '产品序号',
            key: 'product_id',
            width: 120,
            align: 'center'
          },
          {
            title: '产品中文名',
            key: 'product_name',
            width: 120,
          },
          {
            title: '产品英文名',
            key: 'product_en_name',
            width: 120,
          },
          {
            title: '产品简介',
            key: 'product_introduce',
            width: 120,
          },
          {
            title: '产品英文简介',
            key: 'product_en_introduce',
            width: 120,
          },
          {
            title: '产品详情',
            key: 'article_id',
            width: 120,
          },
          {
            title: '产品分类',
            key: 'category_id',
            width: 100,
          },
          {
            title: '产品状态',
            key: 'product_status',
            // width: 120,
            align: 'center'
          },
          {
            title: 'createdAt',
            key: 'createdAt',
            width: 120,
            align: 'center'
          },
          {
            title: 'updatedAt',
            key: 'updatedAt',
            width: 120,
            align: 'center'
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
                      this.update(params.row.product_id);
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
                      this.product_id = params.row.product_id;
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
    created() {
      this.getProductList()
    },
    methods: {
      ...mapActions({
        productList: 'product/productList',
        deleteProduct: 'product/deleteProduct'
      }),
      // 获取用户列表
      async getProductList() {
        try {
          const ret = await this.productList();
          this.$Message.success('获取产品列表成功');
          this.list = ret;
          console.log(ret.data)
        } catch (e) {
          this.$Message.error('获取产品列表失败');

        }
      },
      // 更新产品
      async update(product_id) {
        this.$router.push("/product/update/" + product_id);
      },

      // 移除产品
      async remove(product_id) {
        try {
          await this.deleteProduct(product_id);
          this.$Message.success('删除产品成功');
          this.getProductList();

        } catch (e) {
          console.log(e);
          this.$Message.error('删除产品失败');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
