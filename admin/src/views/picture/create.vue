<template>
  <Form ref="pictureData" :model="pictureData" :rules="ruleValidate" :label-width="80">
    <FormItem label="图片标题" prop="title">
      <Input v-model="pictureData.picture_title" placeholder="title"></Input>
    </FormItem>
    <FormItem label="上传图片" prop="banner">
      <!--<Input v-model="pictureData.banner" placeholder="banner"></Input>-->
      <img :src="pictureData.picture_url" width="200px" height="100px">
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
      <Select v-model="pictureData.picture_position" placeholder="Select your category">
        <Option value="0">无</Option>
        <Option value="1">首页轮播图</Option>
        <Option value="2">广告位</Option>
        <Option value="3">广告位</Option>
        <Option value="4">广告位</Option>
        <Option value="5">分类图</Option>
        <Option value="6">产品</Option>
      </Select>
    </FormItem>

    <FormItem label="绑定产品" prop="title">
      <Input v-model="pictureData.product_id" placeholder="绑定产品" :disabled="pictureData.picture_position != 6"></Input>
    </FormItem>

    <FormItem label="是否启用">
      <i-switch v-model="pictureData.picture_status" size="large">
        <span slot="true">On</span>
        <span slot="false">Off</span>
      </i-switch>
    </FormItem>
    <FormItem>
      <Button @click="handleReset('pictureData')">重置</Button>
      <Button type="primary" style="margin-left: 8px" @click="handleSubmit('pictureData')">创建</Button>
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
        banner:{},
        pictureData: {
          picture_title: '',
          picture_url: '',
          picture_status: true,
          picture_position: '',
          product_id: '',
        },
        ruleValidate: {
          picture_title: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      // this.getCategory();

    },
    methods: {
      ...mapActions({
        createPicture: 'picture/createPicture',
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
        this.pictureData.picture_url = res.url
      },

      // 提交
      handleSubmit(name) {
        if(this.pictureData.picture_url == '')
          return this.$Message.error('请上传图片')
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              await this.createPicture(this.pictureData);
              this.$Message.success('创建图片成功');
              window.location.href = "/picture/list";

            } catch (e) {
              this.$Message.error('创建图片失败')
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
