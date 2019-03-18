<template>
  <Form ref="articleData" :model="articleData" :rules="ruleValidate" :label-width="80">
    <FormItem label="文章标题" prop="title">
      <Input v-model="articleData.article_title" placeholder="title"></Input>
    </FormItem>
    <FormItem label="文章图片" prop="banner">
      <img :src="articleData.banner" width="200px" height="100px">
      <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :max-size="2048"
        multiple
        type="drag"
        action="http://localhost:3000/api/v1/upload"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
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
      <i-switch v-model="articleData.status" size="large">
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
      <Button type="primary" style="margin-left: 8px" @click="handleSubmit('articleData')">更新</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState({

      })
    },
    data() {
      return {
        id: this.$route.params.id,
        articleData: {

        },
        ruleValidate: {
          article_title: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          author: [
            {required: true, message: 'Author cannot be empty', trigger: 'blur'}
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
      this.getArticleInfo();
      console.log(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        updateArticle: 'article/updateArticle',
        getArticleDetail: 'article/getArticleDetail',
        getCategoryList: 'category/getCategoryList'
      }),

      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleSuccess (res, file) {
        console.log(res.url)
        this.articleData.banner = res.url
      },

      // 获取文章信息
      async getArticleInfo() {
        try {
          const ret = await this.getArticleDetail(this.$route.params.id);
          this.articleData = ret;
          this.$Message.success('获取文章成功')

        } catch (e) {
          this.$Message.error('获取文章失败')
        }
      },

      // 获取分类
      async getCategory() {
        try {
          await this.getCategoryList();
          this.$Message.success('获取分类成功')

        } catch (e) {
          this.$Message.error('获取分类失败')
        }
      },

      // 提交
      handleSubmit(name) {
        this.articleData.id = this.id;
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              await this.updateArticle(this.articleData);
              this.$Message.success('更新成功');
              window.location.href = "/article/list";
            } catch (e) {
              this.$Message.error('更新失败')
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
