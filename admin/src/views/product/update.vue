<template>
  <Form ref="productData" :model="productData" :rules="ruleValidate" :label-width="120">
    <FormItem label="产品标题" prop="product_name">
      <Input v-model="productData.product_name" placeholder="产品标题"></Input>
    </FormItem>
    <FormItem label="产品英文标题" prop="product_en_name">
      <Input v-model="productData.product_en_name" placeholder="产品英文标题"></Input>
    </FormItem>
    <FormItem label="产品简介" prop="product_introduce">
      <Input v-model="productData.product_introduce" placeholder="产品简介"></Input>
    </FormItem>
    <FormItem label="产品英文简介" prop="product_en_introduce">
      <Input v-model="productData.product_en_introduce" placeholder="产品英文简介"></Input>
    </FormItem>
    <FormItem label="产品详情页" prop="article_id">
      <Input v-model="productData.article_id" placeholder="绑定文章"></Input>
    </FormItem>
    <FormItem label="产品图片" prop="banner">
      <!--<Input v-model="productData.banner" placeholder="banner"></Input>-->
      <img :src="productData.picture_url" width="300px" height="300px">
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
    <FormItem label="产品分类" prop="picture_url">
      <Input v-model="productData.category_id" placeholder="title"></Input>
    </FormItem>
    <FormItem label="是否启用">
      <i-switch v-model="productData.product_status" size="large">
        <span slot="true">On</span>
        <span slot="false">Off</span>
      </i-switch>
    </FormItem>
    <FormItem>
      <Button @click="handleReset('productData')">重置</Button>
      <Button type="primary" style="margin-left: 8px" @click="handleSubmit('productData')">更新</Button>
    </FormItem>
    <div>
      <Upload
        multiple
        :on-success="addtolist"
        action="http://localhost:3000/api/v1/upload">
        <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
      </Upload>
      <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>

    </div>
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
        file: null,
        fileList:[],
        loadingStatus: false,
        product_id: this.$route.params.product_id,
        productData: {

        },
        ruleValidate: {
          product_name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          product_introduce: [
            {required: true, message: 'product_introduce cannot be empty', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      this.getProductInfo();
      console.log(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        updateProduct: 'product/updateProduct',
        getProductDetail: 'product/getProductDetail',
        getCategoryList: 'category/getCategoryList'
      }),
      handleUpload (file) {
        this.file = file;
        return false;
      },
      upload () {
        this.loadingStatus = true;
        setTimeout(() => {
          this.file = null;
          this.loadingStatus = false;
          this.$Message.success('Success')
        }, 1500);
      },
      // 获取文章信息
      async getProductInfo() {
        try {
          const ret = await this.getProductDetail(this.$route.params.id);
          this.productData = ret;
          this.$Message.success('获取文章成功')

        } catch (e) {
          this.$Message.error('获取文章失败')
        }
      },
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
        this.productData.picture_url = res.url
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
        this.productData.product_id = this.$route.params.id;
        console.log(this.productData)
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              await this.updateProduct(this.productData);
              this.$Message.success('更新成功');
              window.location.href = "/product/list";
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
