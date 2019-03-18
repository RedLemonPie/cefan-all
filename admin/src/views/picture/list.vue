<template>

  <section class="list-wrap">
    <div class="list" v-if="list.length >= 0">
      <Table border :columns="columns" :data="list"></Table>
    </div>
    <div class="model">
      <Modal
        v-model="showModel"
        title="提示"
        @on-ok="remove(picture_id)">
        <p>确定删除该图片么吗</p>
      </Modal>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        // 图片ID
        picture_id: '',
        showModel: false,
        list: [],
        columns: [
          {
            title: '图片序号',
            key: 'picture_id',
            width: 120,
            align: 'center'
          },
          {
            title: '图片名称',
            key: 'picture_title',
            width: 120,
          },
          {
            title: '图片链接',
            key: 'picture_url',
            width: 120,
          },
          {
            title: '图片状态',
            key: 'picture_status',
            width: 120,
          },
          {
            title: '图片位置',
            key: 'picture_position',
            width: 120,
          },
          {
            title: '图片产品号',
            key: 'product_id',
            width: 120,
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
                      this.update(params.row.picture_id);
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
                      this.picture_id = params.row.picture_id;
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
      this.getPictureList()
    },
    methods: {
      ...mapActions({
        pictureList: 'picture/pictureList',
        deletePicture: 'picture/deletePicture'
      }),
      // 获取用户列表
      async getPictureList() {
        try {
          const ret = await this.pictureList();
          this.$Message.success('获取图片列表成功');
          this.list = ret.data;
          console.log(ret.data)
        } catch (e) {
          this.$Message.error('获取图片列表失败');

        }
      },
      // 更新图片
      async update(picture_id) {
        this.$router.push("/picture/update/" + picture_id);
      },

      // 移除图片
      async remove(picture_id) {
        try {
          await this.deletePicture(picture_id);
          this.$Message.success('删除图片成功');
          this.getPictureList();

        } catch (e) {
          console.log(e);
          this.$Message.error('删除图片失败');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
