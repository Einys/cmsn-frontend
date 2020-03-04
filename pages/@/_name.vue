<template>
  <div>

  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import cmsnService from "@/services/cmsn";

  @Component({
    async asyncData ({ params }) {
      const { data } = await cmsnService.getUserByName( params.name )
      return { user: data }
    }
  })
  export default class Users extends Vue {

  };
</script>

<style scoped>

</style>
