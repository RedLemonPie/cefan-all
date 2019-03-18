<template>
  <!--<section class="list-wrap">-->
    <!--<div>-->
      <!--<Button type="primary" @click="showCreateModel = true">新增</Button>-->
      <!--<Input search enter-button="Search" placeholder="输入用户名" style="width: 40%" />-->
    <!--</div>-->
    <!--<div class="list" v-if="list.length > 0">-->
      <!--<Table border :columns="columns" :data="list"></Table>-->
    <!--</div>-->
    <!--<Modal-->
      <!--v-model="showCreateModel"-->
      <!--title="提示"-->
      <!--:loading="loading"-->
      <!--@on-ok="check('formItem')"-->
    <!--&gt;-->
      <!--<Form ref="formItem" :model="formItem" :rules="ruleInline" inline>-->
        <!--<FormItem prop="username">-->
          <!--<Input type="text" v-model="formItem.username" placeholder="Username">-->
            <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
          <!--</Input>-->
        <!--</FormItem>-->
        <!--<FormItem prop="password">-->
          <!--<Input type="password" v-model="formItem.password" placeholder="Password">-->
            <!--<Icon type="ios-lock-outline" slot="prepend"></Icon>-->
          <!--</Input>-->
        <!--</FormItem>-->
        <!--<FormItem prop="realname" label="真实姓名">-->
          <!--<Input v-model="formItem.realname" placeholder="realname">-->
            <!--<Icon type="ios-lock-outline" slot="prepend"></Icon>-->
          <!--</Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="权限等级" prop="level">-->
          <!--<Select v-model="formItem.level">-->
            <!--<Option value="1">编辑者</Option>-->
            <!--<Option value="2">管理员</Option>-->
            <!--&lt;!&ndash;<Option value="3">超级管理员</Option>&ndash;&gt;-->
          <!--</Select>-->
        <!--</FormItem>-->
      <!--</Form>-->
      <!--<div slot="footer">-->
        <!--<Button size="large" long  @click="check('formItem')">创建</Button>-->
      <!--</div>-->
    <!--</Modal>-->
    <!--<div class="model">-->
      <!--<Modal-->
        <!--v-model="showDelModel"-->
        <!--title="提示"-->
        <!--@on-ok="remove(id)">-->
        <!--<p>确定删除用户吗</p>-->
      <!--</Modal>-->
    <!--</div>-->
    <!--<div v-if=""></div>-->
  <!--</section>-->
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  export default {
    data() {
      return {
        id: '',
        loading: true,
        showDelModel:false,
        showCreateModel:false,
        formItem: {
          username: '',
          password: '',
          realname: '',
          level: '',
        },
        ruleInline: {
          username: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ],
          realname: [
            { required: true, message: 'Please fill in the realname', trigger: 'blur' }
          ],
          level: [
            { required: true, message: 'Please choose', trigger: 'change' }
          ],
        },
        list: [],
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 120,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '真实姓名',
            key: 'realname'
          },
          {
            title: '等级',
            key: 'level'
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
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.id = params.row.id;
                      this.showDelModel = true;
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
      this.getAdminList()
    },
    methods: {
      ...mapActions({
        adminList: 'user/adminList',
        deleteUser: 'user/deleteUser',
        userRegister: 'user/userRegister'
      }),

      check(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.create()
          } else {
            this.$Message.error('Fail!');
            this.loading = false
          }
        })
      },

      async create(){
        try {
          let res = await this.userRegister(this.formItem);
          this.$Message.success('创建成功');
          this.showCreateModel=false
          this.getAdminList()
        } catch (err) {
          this.loading = false;
          this.$Message.error(err.data.msg);
        }
      },
      // 获取用户列表
      async getAdminList() {
        try {
          const ret = await this.adminList();
          this.list = ret.data.data;
        } catch (e) {
        }
      },
      show(index) {
        console.log(index);
      },
      async remove(id) {
        try {
          await this.deleteUser(id);
          this.$Message.success('删除用户成功');
          this.getAdminList()
        } catch (e) {
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
