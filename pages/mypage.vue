<template>
  <div>
    <nuxt-child/>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
import Navigation from "@/components/mypage/navigation.vue";
  @Component({
    components:{
      "my-nav": Navigation
    }
  })
  export default class App extends Vue {

  };
</script>

<style scoped>

</style>
