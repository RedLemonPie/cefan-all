<template>
  <Form ref="categoryData" :model="categoryData" :rules="ruleValidate" :label-width="80">
    <FormItem label="分类名称" prop="category_name">
      <Input v-model="categoryData.category_name" placeholder="category name"></Input>
    </FormItem>
    <FormItem label="父分类id" prop="parent_id">
      <Input v-model="categoryData.parent_id" placeholder="parent_id"></Input>
    </FormItem>
    <FormItem>
      <Button @click="handleReset('categoryData')">重置</Button>
      <Button type="primary" style="margin-left: 8px" @click="handleSubmit('categoryData')">创建</Button>
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
        categoryData: {
          category_name: '',
          parent_id: 0,
        },
        ruleValidate: {
          category_name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    methods: {
      ...mapActions({
        createCategory: 'category/createCategory'
      }),

      // 提交
      handleSubmit(name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            try {
              await this.createCategory(this.categoryData);
              this.$Message.success('创建分类成功');
              window.location.href = "/category/list";

            } catch (e) {
              this.$Message.error('创建分类失败')
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
