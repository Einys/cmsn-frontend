<template>
	<v-container fluid fill-height style="box-sizing:border-box; max-width:800px;">

		<v-row no-gutters align="center">

			<v-row no-gutters align="center" class="headline font-weight-bold py-5"> 팔로잉

				<span class="pa-2" data-tooltip-text="내가 팔로우한 계정(최대 1천개) 중 세메센에 홍보중인 계정을 표시합니다. 최근 15분 안에 팔로우한 계정은 표시되지 않을 수 있습니다.">
          <v-icon color="grey lighten-1">mdi-help-circle</v-icon>
        </span>

			</v-row>

			<v-row align="center" justify="center" no-gutters style="width:100%; max-width:800px;">
				<v-alert text type="info" color="green">
					프로필 사진이 기본 이미지<v-icon color="green">mdi-account</v-icon>로 표시되는 경우 이용자가 세메센을 이용한 후에 트위터 프로필 사진을 변경한 경우일 수 있습니다.
				</v-alert>
			</v-row>
		</v-row>

		<v-row v-if=" followingLoading " class="pa-5" align="center" justify="center">
			<v-col cols="6">
				<v-progress-linear indeterminate color="light-blue"></v-progress-linear>

			</v-col>
		</v-row>
    <v-row v-if=" !followingLoading && !(followingList && followingList[0]) " align="center" justify="center" style="height: 200px; color: #707070">
      아직 홍보 중인 사람이 없어요.
    </v-row>
		<v-row v-if=" (followingList && followingList[0]) "  no-gutters justify="center">
			<v-card v-for="user in followingWhoHasItemList" :key="user.id" class="my-1 usercard" flat style="width:100%; max-width:800px; box-sizing:border-box">

				<v-list-item :href=" 'https://twitter.com/' + user.name " target="_blank">
					<v-row no-gutters align="center" justify="center" class="mt-5">

						<v-row justify="center" align="center" style="max-width:700px">
							<v-col cols="auto">
								<v-avatar :tile="false" size="60" class="mr-3">
									<img :src="bigProfilePic(user.profileImg)" @error="user.profileImg = profileErrorImageRoute" />
								</v-avatar>
							</v-col>
							<v-col cols="auto" style="max-width: 60%">
								<v-row justify="start" style="box-size:border-box; white-space:nowrap; text-overflow:ellipsis; overflow: hidden;">
									{{user.profileName}}
								</v-row>
								<v-row justify="start" align="center" class="grey--text text--darken-1">
									@&nbsp;<span style="font-size:0.9em">{{user.name}}</span>
								</v-row>

							</v-col>
						</v-row>
					</v-row>
				</v-list-item>

				<v-row no-gutters justify="center">
					<v-list width="100%">
						<v-list-item three-line v-for="(item) in userItemSort(user._items)" :key="item.id" style="width:100%;" :href="`https://twitter.com/i/web/status/${item.id}/`" target="_blank">
							<template class="useritem small" v-if="$vuetify.breakpoint.smAndDown">
								<v-list-item-avatar size="80" tile>
									<v-img v-if="item.attachment && item.attachment[0]" :src="item.attachment[0].src" aspect-ratio="1.5" @error="item.attachment[0].src = '/_nuxt/assets/404.jpg'">

									</v-img>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title style="font-size: 0.8em" class="grey--text text--darken-1">
										마지막 홍보 {{item.departedAt | datepassed}} · {{item.index.intent[0] | intent}}
									</v-list-item-title>

									<v-list-item-subtitle class="grey--text text--darken-3">
										{{item.text | text | nonewline }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</template>
							<template class="useritem large" v-else>
								<v-row justify="center">
									<v-card flat style="width:100%;  max-width:700px; background:transparent">
										<v-card-text class="grey--text text--darken-3">
											<v-row no-gutters class="grey--text text--darken-1">
												마지막 홍보 {{item.departedAt | datepassed}} · {{item.index.intent[0] | intent}}
											</v-row>
											<v-row>
												<v-col class="grow">
													<v-row no-gutters justify="start" style="overflow: hidden; line-height:1.6em;letter-spacing: 0.3px; text-overflow: ellipsis; max-height:100px;   display: -webkit-box;  -webkit-line-clamp:4; -webkit-box-orient:vertical;">
														{{item.text | text | nonewline }}
													</v-row>
												</v-col>
												<v-col cols="3" class="shrink" v-if="thumbImagesLocal(item)">
													<v-img :src="thumbImagesLocal(item)[0]" height=88 lazy-src="/_nuxt/assets/404.jpg" @error="item.attachment[0].src = '/_nuxt/assets/404.jpg'">
													</v-img>
												</v-col>

											</v-row>
										</v-card-text>

									</v-card>
								</v-row>

							</template>

						</v-list-item>
					</v-list>
					<!--
					<v-card flat v-for="(item) in userItemSort(user._items)" :key="item.id" class="mt-3" style="max-width:700px">
						<v-row>
							<v-col cols=12>

								<v-card-text class="grey--text text--darken-3">

									<v-list-item three-line v-if="$vuetify.breakpoint.smAndDown">
										<v-list-item-avatar size="80" tile>
											<v-img v-if="item.attachment && item.attachment[0]" :src="item.attachment[0].src" aspect-ratio="1.5" @error="item.attachment[0].src = '/_nuxt/assets/404.jpg'">

											</v-img>
										</v-list-item-avatar>
										<v-list-item-content>
											<v-list-item-title style="font-size:1em">
												{{item.departedAt | datepassed}}
											</v-list-item-title>

											<v-list-item-subtitle>
												{{item.text | text | nonewline }}
											</v-list-item-subtitle>
										</v-list-item-content>

									</v-list-item>

									<v-row align="center" v-else>

										<v-row no-gutters class="grey--text text--darken-1">
											{{item.departedAt | datepassed}}
										</v-row>
										<v-col cols="8">
											<v-row no-gutters class="mt-2" justify="start" style="overflow: hidden; text-overflow: ellipsis; max-height:100px;   display: -webkit-box;  -webkit-line-clamp:4; -webkit-box-orient:vertical;">
												{{item.text | text | nonewline }}
											</v-row>
										</v-col>
										<v-col cols="4">
											<v-img v-if="item.attachment && item.attachment[0]" :src="item.attachment[0].src" aspect-ratio="1.3" height="100px" lazy-src="/_nuxt/assets/404.jpg" @error="item.attachment[0].src = '/_nuxt/assets/404.jpg'">
											</v-img>
										</v-col>

									</v-row>
								</v-card-text>
							</v-col>

						</v-row>

					</v-card> -->

				</v-row>
				<template v-if="user._items.length > 2">
					<v-row no-gutters justify="center" class="caption py-3">
						... and more

					</v-row>

				</template>
			</v-card>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import Navigation from "@/components/mypage/navigation.vue";
import { Component, Mixins, Vue } from "vue-property-decorator";
import ProfileMixin from "@/components/mixin/profile.ts";
import ItemMixin from "@/components/mixin/item.ts";

@Component({
  async asyncData({ store, $axios }) {
    /*
    await store.dispatch("getAuthUser");
    const res = await $axios.get(
      "1.0/data/users/id/" + store.state.authUser.id
    );
    console.log(res);
    return { myuser: res.data };
    */
  },
  components: {
    "my-nav": Navigation,
  },
})
export default class MypageFollowingPage extends Mixins(
  ProfileMixin,
  ItemMixin
) {
  followingList: any[] = [];
  getCount = 0;
  tooltip = false;
  followingLoading = false;

  logout() {
    return this.$axios.get("/logout");
  }
  mounted() {
    this.getfriends();
  }
  async getfriends() {
    try {
      this.followingLoading = true;
      this.followingList = [];
      const res = await this.$axios.get("/1.0/data/users/authenticated/friends/db");
      this.followingList = res.data;
    } catch (e) {
      console.dir(e);
      if (e.response.status === 429) {
        console.log("too many request");
      } else if (e.response.status === 401) {
        window.location.href =
          this.$axios.defaults.baseURL +
          "/auth/twitter?returnTo=" +
          this.$route.fullPath;
      } else {
        this.$nuxt.error(e.message);
      }
    } finally {
      this.followingLoading = false;
    }
  }

  userItemSort(userItemArray: any[]) {
    userItemArray = userItemArray.slice(0, 2);
    return userItemArray;
  }

  get followingWhoHasItemList() {
    return this.followingList.filter((user) => {
      return user._items && user._items[0];
    });
  }

  thumbImagesLocal(item) {
    return this.thumbImages(item);
  }
}
</script>

<style scoped>
[data-tooltip-text]:hover {
	position: relative;
}

[data-tooltip-text]:after {
	-webkit-transition: bottom .3s ease-in-out, opacity .3s ease-in-out;
	-moz-transition: bottom .3s ease-in-out, opacity .3s ease-in-out;
	transition: bottom .3s ease-in-out, opacity .3s ease-in-out;

	background-color: rgba(0, 0, 0, 0.8);

  -webkit-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
	-moz-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
	box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);

  -webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;

  color: #FFFFFF;
	font-size: 12px;
  font-weight: normal;
	margin-bottom: 10px;
	padding: 7px 12px;
	position: absolute;
  width: 60vw;
	min-width: 150px;
	max-width: 300px;
	word-wrap: break-word;

	z-index: 9999;

	opacity: 0;
	left: -9999px;
  top: 90%;

	content: attr(data-tooltip-text);
}

[data-tooltip-text]:hover:after {
	top: 130%;
	left: 0;
	opacity: 1;
}
</style>
