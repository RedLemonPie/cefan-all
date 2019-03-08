<template>
  <Form ref="articleData" :model="articleData" :rules="ruleValidate" :label-width="80">
    <FormItem label="文章标题" prop="title">
      <Input v-model="articleData.article_title" placeholder="title"></Input>
    </FormItem>
    <!--<FormItem label="文章作者" prop="author">-->
      <!--<Input v-model="articleData.author" placeholder="author"></Input>-->
    <!--</FormItem>-->
    <FormItem label="文章图片" prop="banner">
      <Input v-model="articleData.banner" placeholder="banner"></Input>
    </FormItem>
    <FormItem label="分类" prop="category">
      <Select v-model="articleData.category" placeholder="Select your category">
        <Option value="1">广告</Option>
        <Option value="2">产品</Option>
        <Option value="3">公告</Option>
        <Option value="3">通知</Option>
      </Select>
    </FormItem>
    <FormItem label="是否启用">
      <i-switch v-model="articleData.switch" size="large">
        <span slot="true">On</span>
        <span slot="false">Off</span>
      </i-switch>
    </FormItem>
    <FormItem label="文章简介" prop="introduce">
      <Input v-model="articleData.introduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
             placeholder="introduce"></Input>
    </FormItem>
    <FormItem label="文章内容" prop="content">
      <mavon-editor v-model="articleData.content"/>
    </FormItem>
    <FormItem>
      <Button @click="handleReset('articleData')">重置</Button>
      <Button type="primary" style="margin-left: 8px" @click="handleSubmit('articleData')">创建</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState({
        categoryList: state => state.category.categoryList
      })
    },
    data() {
      return {
        articleData: {
          article_title: '',
          category: '',
          switch:'',
          banner: '',
          introduce: '',
          content: ''
        },
        ruleValidate: {
          article_title: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          category: [
            {required: true, message: 'Please select the category', trigger: 'change'}
          ],
          banner: [
            {required: true, message: 'Banner cannot be empty', trigger: 'blur'}
          ],
          introduce: [
            {required: true, message: 'Introduce cannot be empty', trigger: 'blur'}
          ],
          content: [
            {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
            {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      // this.getCategory();

    },
    methods: {
      ...mapActions({
        createArticle: 'article/createArticle',
        // getCategoryList: 'category/getCategoryList'
      }),

      // // 获取分类
      // async getCategory() {
      //   try {
      //     await this.getCategoryList();
      //   } catch (e) {
      //
      //   }
      // },

      // 提交
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              await this.createArticle(this.articleData);
              this.$Message.success('创建文章成功');
              window.location.href = "/article/list";

            } catch (e) {
              this.$Message.error('创建文章失败')
            }
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
