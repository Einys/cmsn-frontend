<template>
	<v-container justify-center style="text-align:center; max-width:320px; padding:0;">
		<v-col class="mb-3">
			<v-btn text to="/t/all/open">
				<h2 style="cursor:pointer">커미션 열었어요</h2>

			</v-btn>
			<v-layout row align-center justify-space-around style="font-size: 20px;">
				<v-btn color="blue-grey" text :to="{path:'/t/art/open'}">
					<v-icon left>mdi-satellite</v-icon>그림
				</v-btn>
				<v-btn color="blue-grey darken-2" text :to="{path:'/t/wri/open'}">
					<v-icon left>mdi-text</v-icon> 글..
				</v-btn>

			</v-layout>
			<v-layout row align-center justify-space-around style="font-size: 20px;">
				<v-btn color="blue-grey darken-2" text :to="{path:'/t/des/open'}">
					<v-icon left>mdi-shape</v-icon> 디자인..
				</v-btn>
				<v-btn color="blue-grey" text :to="{path:'/t/mus/open'}">
					<v-icon left>mdi-music-note</v-icon> 음악..
				</v-btn>

			</v-layout>
		</v-col>

		<v-btn text to="/t/all/find">
			<h2 style="cursor:pointer">커미션 찾습니다</h2>

		</v-btn>
		<v-layout row align-center justify-space-around>
			<v-btn color="blue-grey" text :to="{path:'/t/art/find'}">
				<v-icon left>mdi-satellite</v-icon>그림
			</v-btn>
			<v-btn color="blue-grey darken-2" text :to="{path:'/t/wri/find'}">
				<v-icon left>mdi-text</v-icon> 글..
			</v-btn>

		</v-layout>
		<v-layout row align-center justify-space-around>
			<v-btn color="blue-grey darken-2" text :to="{path:'/t/des/find'}">
				<v-icon left>mdi-shape</v-icon> 디자인..
			</v-btn>
			<v-btn color="blue-grey" text :to="{path:'/t/mus/find'}">
				<v-icon left>mdi-music-note</v-icon> 음악..
			</v-btn>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class CatVert extends Vue {}
</script>

<style scoped>
h2{
  color:rgb(44, 51, 59);
  font-weight: 300;
}
</style>
