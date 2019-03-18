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

    <FormItem label="分类" prop="category" v-if="pictureData.picture_position">
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
      <Button type="primary" style="margin-left: 8px" @click="handleSubmit('pictureData')">更新</Button>
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
        pictureData: {

        },
        ruleValidate: {
          picture_name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          picture_introduce: [
            {required: true, message: 'picture_introduce cannot be empty', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      this.getPictureInfo();
      console.log(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        updatePicture: 'picture/updatePicture',
        getPictureDetail: 'picture/getPictureDetail',
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
        this.pictureData.picture_url = res.url
      },

      // 获取图片信息
      async getPictureInfo() {
        try {
          const ret = await this.getPictureDetail(this.$route.params.id);
          this.pictureData = ret;
          this.$Message.success('获取图片成功')

        } catch (e) {
          this.$Message.error('获取图片失败')
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
        this.pictureData.id = this.id;
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              await this.updatePicture(this.pictureData);
              this.$Message.success('更新成功');
              window.location.href = "/picture/list";
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
