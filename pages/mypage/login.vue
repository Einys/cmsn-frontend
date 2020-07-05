<template>
	<div>
		<v-btn rounded dark depressed color="blue" :href="'/auth/twitter'" target="_blank">
			<v-icon left>mdi-twitter</v-icon>로그인
		</v-btn>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class MyPageLoginPage extends Vue {}
</script>

<style scoped>
</style>
