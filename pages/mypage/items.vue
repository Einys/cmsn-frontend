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
							<v-btn outlined rounded color="grey darken-2" class="mr-2">새로고침</v-btn>
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
				<v-row align="center" no-gutters>
					<v-col cols="12" md="auto">
						<div class="headline font-weight-bold pr-3"> 나의 홍보 </div>

					</v-col>
					<v-col cols="12" md="auto">
						<v-subheader class="px-0">비활성화된 지 1개월이 지난 홍보는 이 목록에서 삭제될 수 있습니다. </v-subheader>

					</v-col>
				</v-row>
				<v-card v-for="item in myUser._items" :key="item.id" class="mb-2" :flat="!item.activated" :disabled="!item.activated">

					<v-list-item three-line>

						<v-list-item-avatar size="100">
							<img v-if="item.attachment && item.attachment[0]" :src="item.attachment[0].src" @error="onItemImageError($event, item.attachment[0].src)" />
							<img v-else :src="emptyItemImage" />

						</v-list-item-avatar>
						<v-list-item-content>

							<v-list-item-content>

								<v-list-item-subtitle style="font-size:1em;">
									<v-card-text class="px-0 py-0">
										{{ item.text | text | nonewline }}
									</v-card-text>
								</v-list-item-subtitle>
								<v-list-item-subtitle style="font-size:0.8em;">
									<v-row no-gutters align="center">
										<span class="grey--text pr-1">마지막 홍보 <span>{{ item.departedAt | datepassed }}</span></span>
										<template v-if="$vuetify.breakpoint.mdAndUp">
											<v-btn text color="blue" v-if="item.activated">
												<v-icon small>mdi-rewind</v-icon>재홍보
											</v-btn>
											<v-btn v-else color="orange" text style="opacity:1; pointer-events:auto" >
												<v-icon small>mdi-rewind</v-icon>활성화
											</v-btn>
											<v-btn color="blue-grey" style="position:absolute; right:0; opacity:1; pointer-events:auto" class="mr-1" text :to=" '/i/'+item.id ">
												<v-icon left>mdi-file-document-outline</v-icon>자세히
											</v-btn>
										</template>

									</v-row>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item-content>
					</v-list-item>
					<v-card-actions v-if="$vuetify.breakpoint.smAndDown" class="pt-0" style="opacity:1">
						<v-btn color="blue-grey" class="mr-1" text :to=" '/i/'+item.id " style="pointer-events:auto">
							<v-icon left>mdi-file-document-outline</v-icon>자세히
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn text color="blue" v-if="item.activated">
							<v-icon small left>mdi-rewind</v-icon>재홍보
						</v-btn>
						<v-btn text v-else color="orange" style="pointer-events:auto">
							<v-icon small left>mdi-rewind</v-icon>활성화
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>

		</v-row>

		<v-row v-else align="center" justify="center" class="grey--text text--darken-2" style="min-height:200px;">
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
