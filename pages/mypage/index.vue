<template>
	<div>
		<v-btn rounded depressed @click="logout()" target="_blank">
			로그아웃
		</v-btn>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  middleware: "authenticated"
})
export default class MypagePage extends Vue {

  logout(){
    return this.$axios.get("/logout")
  }
}
</script>

<style scoped>
</style>
