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
				<v-card v-for="item in myUser._items" :key="item.id" class="mb-2" flat>
					<v-list-item two-line>

						<v-list-item-avatar size="100">
							<img v-if="item.attachment && item.attachment[0]" :src="item.attachment[0].src" @error="onItemImageError($event, item.id)" />
							<img v-else :src="emptyItemImage" @error="onItemImageError($event, item.id)" />

						</v-list-item-avatar>
						<v-list-item-content>

							<v-list-item-content>
								<v-list-item-subtitle>
									{{ item.departedAt | datepassed }}
								</v-list-item-subtitle>
								<v-list-item-title>
									{{ item.text | text | nonewline }}
								</v-list-item-title>

							</v-list-item-content>

							<v-row align="center">
								<v-btn fab small text color="red">
									<v-icon>mdi-delete</v-icon>

								</v-btn>

								<v-btn fab small text color="teal" :to="'/i/'+item.id">
									<v-icon>mdi-cog</v-icon>
								</v-btn>
								<v-spacer></v-spacer>
								<v-btn color="blue" dark text>
									<v-icon left>mdi-twitter</v-icon> 재홍보
								</v-btn>

							</v-row>

						</v-list-item-content>

					</v-list-item>

				</v-card>
			</v-col>

		</v-row>

			<v-row v-else align="center" justify="center" class="grey--text text--darken-2" style="min-height:200px; background-color: rgba(100,100,110,0.01)">
        <v-col>
          <v-row align="center" justify="center">
				아직 아무것도 없습니다.

          </v-row>
          <v-row align="center" justify="center">
				홍보를 하시려면 <nuxt-link to="/help"> &nbsp;이용안내</nuxt-link> 를 참고해주세요.

          </v-row>
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
    Masonry,
  },
})
export default class MypagePage extends Mixins(ProfileMixin, ItemMixin) {
  followingList: [any];

  get authUser() {
    return this.$store.state.authUser;
  }

  get myUser() {
    return this.$store.state.myUser;
  }

  get myItem() {
    return this.myUser._items;
  }
}
</script>

<style scoped>
</style>
