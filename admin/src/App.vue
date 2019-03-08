<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import loadingView from './components/loading'
  import {mapGetters} from 'vuex';

  export default {
    components: {
      loadingView
    },
    computed: {
      ...mapGetters('loading', [
        'isLoading',
        'loadingText'
      ]),
    },
  }
</script>

<style lang="less">
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
      top: 0;
    }
  }
</style>
