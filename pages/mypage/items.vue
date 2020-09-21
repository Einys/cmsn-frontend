<template>
	<v-container fluid fill-height v-if="authUser && myUser">
		<v-row class="my-profile" align="center" justify="center">
			<v-col cols="12" sm="12" md="6" lg="4">
				<v-row align="center" justify="start" class="d-flex pa-2 flex-nowrap" style="overflow:hidden; text-overflow:ellipsis">
					<v-col align="center" justify="center" cols="5">
						<v-avatar size="98%">
							<img :src="profilePic" alt="my profile pic" @error="onProfileImageError">
						</v-avatar>
					</v-col>
					<v-col cols="7">
						<div class="headline" style="flex: 1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">
							{{myUser.profileName}}
						</div>
						<div style="flex: 1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">
							@{{myUser.name}}
						</div>
						<div class="mt-2 ">
							<v-btn outlined rounded color="grey darken-2" class="mr-2">새로고침</v-btn>
							<v-btn fab small outlined color="blue">
								<v-icon small class="ma-0">mdi-twitter</v-icon>
							</v-btn>
						</div>
					</v-col>

				</v-row>

			</v-col>

		</v-row>

		<!-- 나의 홍보 -->
		<v-row v-if="myItem && myItem[0]" align="center" justify="center">

			<v-col cols="12" md="8" xl="6">
				<v-row align="center" no-gutters>
					<v-col cols="12" md="auto">
						<div class="headline font-weight-bold pr-3"> 나의 홍보 </div>

					</v-col>
					<v-col cols="12" md="auto">
						<v-subheader class="px-0"> 마지막 홍보 후 6개월간 보관됩니다. </v-subheader>

					</v-col>
				</v-row>
				<v-card v-for="item in myItem" :key="item.id" class="mb-2" :flat="!item.activated" :disabled="!item.activated">
					<v-row no-gutters justify="end" align="center" style="flex-wrap: nowrap; overflow: hidden;"  class="px-2 pt-2">
						<v-col cols="auto" style="flex-wrap: nowrap;">
							<item-cat-chip :item="item"></item-cat-chip>
						</v-col>
					</v-row>
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

									</v-row>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item-content>
					</v-list-item>
					<v-card-actions class="pt-0" style="opacity:1">
						<v-btn color="blue-grey" class="mr-1" text :to=" '/i/'+item.id " style="pointer-events:auto">
							<v-icon left>mdi-file-document-outline</v-icon>자세히
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn text color="blue" v-if="item.activated">
							재홍보
						</v-btn>
						<v-btn text v-else color="orange" style="pointer-events:auto">
							활성화
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
import ItemCatChip from "@/components/item/CatChip.vue";

@Component({
  async asyncData({ store, $axios }) {},
  components: {
    Masonry,
    ItemCatChip,
  },
})
export default class MypagePage extends Mixins(ProfileMixin, ItemMixin) {
  followingList: [any];
  promoteError: any = false;
  promoteInProgress = false;
  promote(item) {
    this.promoteInProgress = true;
    this.$axios
      .post("/1.0/data/items/promote", { ...item })
      .then((res) => {
        if (res.status !== 200) {
          this.promoteError = res.status;
        } else {
        }
      })
      .catch((err) => {
        this.promoteError = err;
      })
      .finally(() => {
        this.promoteInProgress = false;
      });
  }

  get authUser() {
    return this.$store.state.authUser;
  }

  get myUser() {
    return this.$store.state.myUser;
  }

  get myItem() {
    if (this.myUser._items && Array.isArray(this.myUser._items)) {
      return [...this.myUser._items].sort(function (a, b) {
        var depA = a.departedAt;
        var depB = b.departedAt;
        var actA = a.activated;
        var actB = b.activated;
        if (actA === actB) {
          if (depA < depB) {
            return 1;
          }
          if (depA > depB) {
            return -1;
          }
        } else {
          if (actA === true) {
            return -1;
          } else {
            return 1;
          }
        }

        //같을 경우
        return 0;
      });
    } else {
      return null;
    }
  }
}
</script>

<style scoped>
</style>
