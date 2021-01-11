<template>
  <v-container class="wrapper">
    <v-row>
      <image-grid></image-grid>
    </v-row>
    <v-row>
      <image-squid></image-squid>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ImageGrid from "@/components/item/imageGrid/Grid.vue"
  import ImageGridSquid from "@/components/item/imageGrid/Squid.vue"

  @Component({
    components:{
      ImageGrid,
      ImageGridSquid
    }
  })
  export default class App extends Vue {
    images= ["https://pbs.twimg.com/media/EpvtUsXVgAEWgKL?format=png&name=360x360",
    "https://pbs.twimg.com/media/EpvtW4NVgAE3CmR?format=jpg&name=360x360",
    "https://pbs.twimg.com/media/EpvtaciVEAE-UQr?format=jpg&name=360x360",
    "https://pbs.twimg.com/media/EpvtdeLUcAARi3t?format=jpg&name=small"]
  };
</script>

<style scoped>

</style>
