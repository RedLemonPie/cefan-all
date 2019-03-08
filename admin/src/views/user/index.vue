<template>
  <!--indev-->
  <!--@author: yry-->
  <!--@date  2019/3/1 08:31-->
  <section class="index-wrap">
    <!-- <img src="http://images.boblog.com/BOBLOG-03.png" alt=""> -->
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    created() {
    },
    mounted() {
    },
    methods: {
      ...mapActions({})
    }
  }
</script>

<style lang="scss" scoped>
  .index-wrap {
    text-align: center;
  }
</style>
