<template>
	<div class="wrapper itempage">
		<div style="margin:0 auto; max-width:720px">
			<v-row no-gutters v-if=" ($store.state.authUser && item._user.id === $store.state.authUser.id) ">
				<v-col>
					<v-card flat>
						<v-list>
							<v-list-item-group color="orange">

								<v-subheader>내 홍보 옵션</v-subheader>
								<v-dialog v-model="catdialog" width="500">
									<template v-slot:activator="{ on, attrs }">
										<v-list-item v-bind="attrs" v-on="on">

											<v-row align="center" style="flex-wrap: nowrap; overflow: hidden;">
												<v-col cols="auto">
													<v-list-item-title>
														<v-icon left>mdi-sort-variant</v-icon>
														분류
													</v-list-item-title>
												</v-col>
												<v-col cols="auto" style="flex-wrap: nowrap;">
													<v-row>
														<span v-for="cat of item.index.cat" :key="cat">
															<v-chip> {{cat | cat}} </v-chip>
														</span>
														<span v-for="intent of item.index.intent" :key="intent">
															<v-chip>{{intent | intent}}</v-chip>
														</span>
													</v-row>
												</v-col>
											</v-row>

										</v-list-item>

									</template>

									<v-card>
										<v-card-title class="pb-0 pt-5">홍보 목적</v-card-title>
										<v-card-text>
											<v-checkbox color="blue lighten-1" :error="needIntent" v-model="item.index.intent" hide-details :label=" 'open' | intent" value="open"></v-checkbox>
											<v-checkbox :error="needIntent" v-model="item.index.intent" hide-details :label=" 'find' | intent" value="find"></v-checkbox>
										</v-card-text>
										<v-card-title class="pb-0 pt-5">분야</v-card-title>
										<v-card-text>
											<v-row no-gutters>
												<v-col cols="12" sm="6">
													<v-checkbox color="amber darken-1" :error="needCat" hide-details v-model="item.index.cat" :label=" 'art' | catadd" value="art"></v-checkbox>
													<v-checkbox color="amber darken-2" :error="needCat" hide-details="auto" v-model="item.index.cat" :label=" 'des' | catadd" value="des"></v-checkbox>
												</v-col>
												<v-col cols="12" sm="6">
													<v-checkbox color="amber darken-3" :error="needCat" hide-details v-model="item.index.cat" :label=" 'wri' | catadd" value="wri"></v-checkbox>
													<v-checkbox color="amber darken-4" :error="needCat" hide-details v-model="item.index.cat" :label=" 'mus' | catadd" value="mus"></v-checkbox>
												</v-col>
											</v-row>
										</v-card-text>
										<v-divider></v-divider>

										<v-card-actions>

											<v-btn color="primary" text @click="catdialog = false">
												취소
											</v-btn>
											<v-spacer></v-spacer>
											<v-btn color="primary" text @click="catUpdate" :loading="catUpdateProgressRunning" :disabled=" needCat || needIntent ">
												확인
											</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
								<v-list-item>
									<v-list-item-title>
										<v-icon left>mdi-replay</v-icon>재홍보
									</v-list-item-title>
								</v-list-item>
                <v-list-item>
									<v-list-item-title>

									</v-list-item-title>
								</v-list-item>



							</v-list-item-group>
              <v-list-item-group color="red">
                <v-list-item flat>
									<v-list-item-title>
										<v-icon left>mdi-sleep</v-icon> 비활성화
									</v-list-item-title>
								</v-list-item>
                                <v-list-item flat>
									<v-list-item-title>
										<v-icon left>mdi-delete</v-icon> 삭제
									</v-list-item-title>
								</v-list-item>
              </v-list-item-group>
              <v-divider>

              </v-divider>
						</v-list>
					</v-card>
				</v-col>

			</v-row>
			<v-card flat class="mb-1">
				<div v-if="images" style="font-size:1px">
					<img :src="images[0]" style="width:100%;" @error="onItemImageError($event, image+'carousel')" />
					<v-row dense>
						<v-col v-for="(image, i) in imagesWithoutFirst" :key="i">
							<v-avatar tile width="100%" height="120">
								<img :src="image" style="width:100%; object-fit:cover" @error="onItemImageError($event, image+'carousel')" />

							</v-avatar>
						</v-col>
					</v-row>
				</div>

				<v-card-text class="body-1 black--text">
					{{text | text}}
				</v-card-text>

				<v-card-actions>
					<v-btn text class="grey--text text--darken-1">
						{{item.departedAt | datepassed}} 홍보
					</v-btn>

					<v-spacer></v-spacer>
          <v-btn text color="grey" fab small @click="likebtnclick" class="btn-like">
						<v-icon>mdi-heart-outline</v-icon>
					</v-btn>
          <v-btn text color="light-blue" fab small class="btn-like" :href="`https://twitter.com/${item._user.name}/status/${item.id}`" target="_blank">
						<v-icon left color="blue">mdi-twitter</v-icon>
					</v-btn>

				</v-card-actions>
			</v-card>

			<div class="mt-2" v-if="item && item.links && Array.isArray(item.links) && item.links[0]">

				<div v-for="(link) in item.links" :key="link._id">
					<v-card flat :href="link.expanded_url" target="_blank">
						<v-row align="center" style="overflow: hidden; text-overflow: ellipsis;">
							<v-list-item>
								<v-list-item-avatar size="100" tile>

									<img width="100%" :src="getMediaSourceOfLinkLocal(link)" @error="link = '/_nuxt/assets/404.jpg'" />

								</v-list-item-avatar>
								<v-list-item-content>
									<div class="caption">
										<v-icon x-small left>mdi-link</v-icon>{{link.display_url}}
									</div>
									<div v-if="link.meta">
										<v-list-item-title>
											<div class="mt-2 font-weight-bold">{{link.meta.title}}</div>

										</v-list-item-title>
										<div class="caption" style="max-height:48px; overflow: hidden; line-height:1.3em; padding-top:4px; padding-right:3px;">{{link.meta.description}}</div>
									</div>
								</v-list-item-content>
							</v-list-item>

						</v-row>

					</v-card>

				</div>
			</div>
			<v-card flat v-if="item._user" class="mt-5 mb-5 pb-5">
				<v-row justify="center" align="center">
					<v-col cols="auto">
						<v-avatar size="120">
							<img :src="bigProfilePic(item._user.profileImg)" @error="onProfileImageError" />
						</v-avatar>

					</v-col>

				</v-row>
				<v-row no-gutters justify="center" align="center">
					<v-col cols="auto">
						<div>
							{{item._user.profileName}}
						</div>
					</v-col>
				</v-row>
				<v-row no-gutters justify="center" align="center">
					<v-col cols="auto" class="body-1" style="">
						@<span style="font-size:0.95rem; vertical-align: middle; padding-left:2px">{{item._user.name}}</span>
						<v-icon small style=" vertical-align: middle; padding-left:3px">mdi-twitter</v-icon>
					</v-col>
				</v-row>
				<v-row justify="center" align="center" v-if=" !($store.state.authUser && item._user.id === $store.state.authUser.id) ">
					<v-col cols="auto">
						<v-btn outlined rounded>
							<v-icon left>mdi-account-plus</v-icon>팔로우
						</v-btn>
					</v-col>
				</v-row>
			</v-card>

			<!-- <div v-if="user">
				<div v-if=" hasActivatedItem">
					<h3>
						{{item._user.name}}님의 다른 홍보
					</h3>
					<div v-for=" i in user._items" :key="i.id">
						<v-card flat v-if=" i.activated && i.id !== item.id">
							<img v-if="item.attachment[0]" :src="item.attachment[0].src" @error="onItemImageError" />
						</v-card>
					</div>
				</div>

			</div>
			<div v-else>
				<v-row justify="center">
					<v-col cols="6">
						<v-progress-linear indeterminate rounded height="6" color="orange"></v-progress-linear>

					</v-col>
				</v-row>
			</div> -->

		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import ItemCard from "@/components/item/Card.vue";
import Images from "@/components/item/Images.vue";
import ProfileMixin from "@/components/mixin/profile.ts";
import ItemMixin from "@/components/mixin/item.ts";

@Component({
  async asyncData({ params, $axios }) {
    const data = await $axios
      .$get("/1.0/data/items/" + params.id, { timeout: 5000 })
      .then((res) => {
        return res;
      });
    return { item: data, user: null };
  },
  head() {
    return {
      title: `${this.item._user.name}의 커미션`,
    };
  },
  components: {
    Images,
  },
})
export default class ItemPage extends Mixins(ProfileMixin, ItemMixin) {
  item: any;
  user: any;
  catdialog = false;
  catUpdateProgressRunning = false;

  mounted() {
    if (this.item._user && this.item._user._items) {
      console.log("do something");
      this.$axios
        .get("/1.0/data/users/id/" + this.item._user.id)
        .then((res) => {
          this.user = res.data;
        });
    }
  }

  get imagesWithoutFirst() {
    return this.images.slice(1);
  }

  get text() {
    return this.item ? this.item.text : null;
  }

  getMediaSourceOfLinkLocal(link) {
    return this.getMediaSourceOfLink(link);
  }

  get images() {
    return this.thumbImages(this.item);
  }

  get hasActivatedItem() {
    function filledArrayGuard(item): item is Array<any> {
      return Array.isArray(item) && item.length > 0;
    }

    let itemarr = this.user._items;

    if (filledArrayGuard(itemarr)) {
      return itemarr.some((e) => {
        return e.activated === true && e.id !== this.item.id;
      });
    } else {
      return false;
    }
  }

  catUpdate() {
    this.catUpdateProgressRunning = true;
    this.$axios.$put('/1.0/data/items/update/index', { cat: this.item.index.cat, intent: this.item.index.intent}).then((res)=>{
      console.log(res)
      window.location.reload();
    }).catch(err => {
      console.error(err)
    }).finally(()=>{
      this.catUpdateProgressRunning = false
    });

  }

  get needCat(){
    return this.item.index.cat.length < 1
  }
  get needIntent(){
    return this.item.index.intent.length < 1
  }
}
</script>

<style>
.itempage .highlight {
  color: #ff7b7b;
}

.btn-like:focus {
  background-color: transparent;
}
</style>






