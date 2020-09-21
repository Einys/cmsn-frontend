<template lang="html">
  <div class="loading-page" v-if="loading">
    <v-row justify="center">
      <sync-loader style="margin:0 auto;"></sync-loader>
    </v-row>
  </div>
</template>

<script>
import DotLoader from '@/components/loader/DotLoader.vue'
import BounceLoader from '@/components/loader/BounceLoader.vue'
import SyncLoader from '@/components/loader/SyncLoader.vue'
  export default {
    components: {
      DotLoader,
      BounceLoader,
      SyncLoader
    },
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 20;
  }
</style>

