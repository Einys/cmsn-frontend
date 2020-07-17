<template>
		<v-navigation-drawer permanent color="grey darken-4" dark app clipped >

			<v-list>
				<v-list-item to="/mypage/list">
        					<v-list-item-icon>
						<v-icon>mdi-account-circle</v-icon>

					</v-list-item-icon>
					<v-list-item-title>나의 홍보 <v-chip x-small style="position:absolute; top:0; right:0" class="ma-2" color="orange" text-color="white">
									<span class="font-italic">beta</span>
								</v-chip></v-list-item-title>

				</v-list-item>
				<v-list-item to="/mypage/following">
        					<v-list-item-icon>
						<v-icon>mdi-account-multiple</v-icon>
					</v-list-item-icon>
					<v-list-item-title>팔로우 중인 홍보 <v-chip x-small style="position:absolute; top:0; right:0" class="ma-2" color="orange" text-color="white">
									<span class="font-italic">beta</span>
								</v-chip></v-list-item-title>
				</v-list-item>
				<v-list-item to="/mypage/likes">
        					<v-list-item-icon>
						<v-icon>mdi-heart</v-icon>
					</v-list-item-icon>
					<v-list-item-title>마음함 <v-chip x-small style="position:absolute; top:0; right:0" class="ma-2" color="orange" text-color="white">
									<span class="font-italic">beta</span>
								</v-chip></v-list-item-title>
				</v-list-item>

			</v-list>

		</v-navigation-drawer>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({})
  export default class MypageNav extends Vue {

  };
</script>

<style scoped>

</style>
