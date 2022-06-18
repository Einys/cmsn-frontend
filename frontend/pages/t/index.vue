<template>
  <div>
    <cat-vert class="mt-5"></cat-vert>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import CatVert from "@/components/cat/Vert.vue";

export default class T extends Vue {
  components:{
    CatVert
  }
};
</script>

<style scoped>

</style>
