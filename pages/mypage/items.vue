<template>
	<v-container fluid fill-height v-if="authUser && myUser">
		<v-row class="my-profile" align="center" justify="center">
			<v-col cols="12" sm="12" md="6" lg="4">
				<v-row align="center" justify="center">
					<v-col align="center" justify="center" cols="auto">
						<v-avatar size="120">
							<img :src="profilePic" alt="my profile pic" @error="onProfileImageError">
						</v-avatar>
					</v-col>
					<v-col cols="auto">
						<div class="headline" style="max-width:240px; white-space: nowrap; overflow:hidden; text-overflow:ellipsis">
							{{myUser.profileName}}
						</div>
						<div>
							@{{myUser.name}}
						</div>
						<div class="mt-2 ">
							<v-btn outlined rounded color="grey darken-2" class="mr-2">프로필</v-btn>
							<v-btn fab small outlined color="blue">
								<v-icon small>mdi-twitter</v-icon>
							</v-btn>
						</div>
					</v-col>

				</v-row>

			</v-col>

		</v-row>

		<!-- 나의 홍보 -->

		<v-row v-if="myUser._items && myUser._items[0]" align="center" justify="center">

			<v-col cols="12" md="8">
				<div class="headline font-weight-bold mb-2"> 나의 홍보 </div>
				<v-list>
					<v-list-item two-line v-for="item in myUser._items" :key="item.id" :to="'/i/'+item.id">

						<v-list-item-avatar>
							<v-img v-if="item.attachment && item.attachment[0]" :src="item.attachment[0]">

							</v-img>
							<v-img v-else src="https://pbs.twimg.com/media/D-s8cUzVAAAP2tf?format=jpg&name=900x900"></v-img>

						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title>
								{{item.text}}
							</v-list-item-title>
							<v-list-item-subtitle>
								n일전 홍보
							</v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-action>
							<v-btn text>설정</v-btn>
							<v-btn text>재홍보</v-btn>
						</v-list-item-action>

					</v-list-item>
				</v-list>
			</v-col>

		</v-row>
		<v-row v-else align="center" justify="center" class="grey--text text--darken-2" style="min-height:200px; background-color: rgba(100,100,110,0.01)">
			아직 아무것도 없습니다.
		</v-row>

		<v-row>
			<v-col>
				{{myItem}}
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from "vue-property-decorator";
import ProfileMixin from "@/components/mixin/profile.ts";
import ItemMixin from "@/components/mixin/item.ts";
import Masonry from "@/components/Masonry.vue";

@Component({
  async asyncData({ store, $axios }) {},
  components: {
    Masonry
  },
  mixins: [ProfileMixin, ItemMixin]
})
export default class MypagePage extends Mixins(ProfileMixin) {
  followingList: [any];

  get authUser() {
    return this.$store.state.authUser;
  }

  get myUser() {
    return this.$store.state.myUser;
  }

  get profilePic() {
    return this.authUser.photos[0].value!.replace("_normal", "");
  }
}
</script>

<style scoped>
</style>
