<template>
	<div>

	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  async asyncData({ params, $axios }) {
    const data = await $axios
      .$get("/1.0/data/users/name/" + params.name + "/following")
      .then(res => {
        return res;
      });
    return { following: data };
  }
})
export default class UserFollowingPage extends Vue {}
</script>

<style scoped>
</style>
