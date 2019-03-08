<template>
<section class="list-wrap">
    <div>
      <Button type="primary" @click="showCreateModel = true">新增</Button>
      <Input search enter-button="Search" placeholder="输入用户名" style="width: 40%" />
      <Upload action="//127.0.0.1:3000/api/v1/upload">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>
    </div>
    <div class="list" v-if="list.length > 0">
      <Table border :columns="columns" :data="list"></Table>
    </div>
    <Modal
      v-model="showCreateModel"
      title="提示"
      class-name="vertical-center-modal"
    >
      <Form ref="formItem" :model="formItem" :rules="ruleInline" inline class="model-form">
        <FormItem prop="id" label="id">
          <Input type="text" v-model="id" placeholder="不用填写" readonly>
          </Input>
        </FormItem>
        <FormItem prop="username" label="username">
          <Input type="text" v-model="formItem.username" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password" label="password">
          <Input type="password" v-model="formItem.password"  placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="realname" label="真实姓名">
          <Input v-model="formItem.realname" placeholder="realname">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="email" label="email">
          <Input v-model="formItem.email" placeholder="email">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="company" label="company">
          <Input  v-model="formItem.company"  placeholder="company">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="telephone" label="telephone">
          <Input  v-model="formItem.telephone"  placeholder="telephone">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="cancer" label="id">
          <Input v-model="formItem.cancer"  placeholder="cancer">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="large" long  @click="check('formItem',0)">创建</Button>
      </div>
    </Modal>
    <Modal
      v-model="showDelModel"
      title="提示"
      @on-ok="remove(id)">
      <p>确定删除用户吗</p>
    </Modal>
    <div v-if=""></div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {
        id: '',
        loading: true,
        submitType: 0,
        showCreateModel:false,
        showeUpdateModel: false,
        showDelModel:false,
        showeModel:false,
        formItem: {
          username: '',
          password: '',
          email:'',
          company:'',
          telephone:'',
          cancer:'',
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
            title: 'email',
            key: 'email'
          },
          {
            title: '公司',
            key: 'company'
          },
          {
            title: '真实姓名',
            key: 'realname'
          },
          {
            title: '电话',
            key: 'telphone'
          },
          {
            title: '职业',
            key: 'cancer'
          },
          {
            title: '积分',
            key: 'score'
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
                      // this.$Message.success(params.row.id);
                      this.changeUpdateModel(params.row);
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
      this.getUserList()
    },
    methods: {
      ...mapActions({
        userList: 'user/userList',
        deleteUser: 'user/deleteUser',
        userRegister: 'user/userRegister',
        updateUser: 'user/updateUser'
      }),
      changeUpdateModel(params){
        this.updateForm.id = params.id
        this.updateForm.username = params.username
        this.updateForm.email = params.email
        this.updateForm.company = params.company
        this.updateForm.telephone = params.telephone
        this.updateForm.cancer = params.cancer
        this.updateForm.score = params.score
        this.showeUpdateModel = true
      },
      check(name,type){
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(type === 0){ this.create()}
            else {this.update()}

          } else {
            this.$Message.error('Fail!');
            this.loading = false
          }
        })
      },
      async update(){
        try {
          let res = await this.updateUser(this.updateForm);
          this.$Message.success(res);
          this.showeUpdateModel=false
          this.getUserList()
        } catch (err) {
          console.log(err)
          this.loading = false;
          this.$Message.error(err);
        }
      },
      async create(){
        try {
          let res = await this.userRegister(this.formItem);
          this.$Message.success('创建成功');
          this.showCreateModel=false
          this.getUserList()
        } catch (err) {
          this.loading = false;
          this.$Message.error(err.data.msg);
        }
      },
      // 获取用户列表
      async getUserList() {
        try {
          const ret = await this.userList();
          this.list = ret.data.data;
        } catch (e) {

        }
      },
      async remove(id) {
        try {
          await this.deleteUser(id);
          this.$Message.success('删除用户成功');
          this.getUserList()
        } catch (e) {
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .model-form{
      margin: 0 auto;
    }
</style>
