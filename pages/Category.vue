<template>
  <div>
    <cat-vert></cat-vert>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import CatVert from "@/components/cat/Vert.vue";
  @Component({
    components:{
      CatVert
    }
  })
  export default class T extends Vue {

  };
</script>

<style scoped>

</style>
