<template>
	<div class="wrapper itempage" style="background:rgba(255,255,255,0.1)">
		<div style="margin:0 auto; max-width:720px;">
			<v-list color="transparent">
				<v-list-item-group color="orange">

					<v-subheader>내 홍보 옵션</v-subheader>
					<v-list-item>
						<v-list-item-title>
							<v-icon left>mdi-folder-multiple-outline</v-icon><span class="mr-2"> 분류 </span>
							<item-cat-chip :item="item"></item-cat-chip>
						</v-list-item-title>
					</v-list-item>

					<v-list-item>
						<v-list-item-title>
							<v-icon left>mdi-replay</v-icon> 재홍보
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-icon left>mdi-sleep</v-icon> 비활성화
						</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
				<v-divider class="mt-3">

				</v-divider>
			</v-list>

			<v-card flat class="mb-1" color="transparent">
				<v-card-actions>
					<span>
            <v-row>
              <v-col>
                <v-avatar>
                  <img :src="item._user.profileImg">
                </v-avatar>
              </v-col>
              <v-col>
                <v-row class="font-weight-bold">
                  @{{item._user.name}}
                </v-row>
                <v-row>
                {{item.departedAt | datepassed}} 홍보

                </v-row>

              </v-col>
            </v-row>

					</span>

					<v-spacer></v-spacer>
					<v-btn v-if="false" text color="grey" fab small @click="likebtnclick" class="btn-like">
						<v-icon>mdi-heart-outline</v-icon>
					</v-btn>
					<v-btn text color="light-blue" class="btn-like" :href="`https://twitter.com/i/web/status/${this.item.id}/`" target="_blank">
						트위터에서 보기<v-icon right color="blue">mdi-twitter</v-icon>
					</v-btn>

				</v-card-actions>
				<v-card-text class="body-1 black--text pt-0" v-if="item.text" :inner-html.prop="item.text | textlink2Section">

				</v-card-text>
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

			</v-card>

      <!-- 링크 -->
			<div id="links" class="mt-2" v-if="item && item.links && Array.isArray(item.links) && item.links[0]">
        <h2 class="mb-1 mt-4">링크된 페이지</h2>
				<div v-for="(link) in item.links" :key="link._id">
					<v-card flat :href="link.expanded_url" target="_blank">
						<v-row align="center" style="overflow: hidden; text-overflow: ellipsis;">
							<v-list-item>
								<v-list-item-avatar size="100" tile>

									<img width="100%" :src="getMediaSourceOfLinkLocal(link)" @error="link = '/_nuxt/assets/404.jpg'" />

								</v-list-item-avatar>
								<v-list-item-content>
									<div class="body-2">
										<v-icon small left>mdi-link</v-icon>{{link.display_url}}
									</div>
									<div v-if="link.meta">
										<v-list-item-title>
											<div class="mt-2 font-weight-bold">{{link.meta.title}}</div>
										</v-list-item-title>
										<div class="caption" style="color:rgba(0, 0, 0, 0.6); max-height:48px; overflow: hidden; line-height:1.3em; padding-top:4px; padding-right:3px;">{{link.meta.description}}</div>
									</div>
								</v-list-item-content>
							</v-list-item>

						</v-row>

					</v-card>

				</div>
			</div>

      <!--프로필-->
			<v-card flat v-if="item._user" class="mt-5 mb-5 pb-5 pt-3">
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
import ItemCatChip from "@/components/item/CatChip.vue";
import ProfileMixin from "@/components/mixin/profile.ts";
import ItemMixin from "@/components/mixin/item.ts";

@Component({
  async asyncData({ params, $axios }) {
    const data = await $axios
      .$get("/1.0/data/items/" + params.id, { timeout: 5000 })
      .then((res) => {
        return res;
      });
    return { item: data, user: data._user || {} };
  },
  head() {
    return {
      title: `${this.user.name}의 커미션`,
    };
  },
  components: {
    Images,
    ItemCatChip,
  },
})
export default class ItemPage extends Mixins(ProfileMixin, ItemMixin) {
  item: any;
  user: any;
  catdialog = false;
  catdialogError = "";
  catUpdateProgressRunning = false;

  mounted() {
    if (this.item._user && !this.user._items) {
      this.$axios.get("/1.0/data/users/id/" + this.user.id).then((res) => {
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
    this.catdialogError = "";
    this.$axios
      .$put("/1.0/data/items/update/index", {
        id: this.item.id,
        cat: this.item.index.cat,
        intent: this.item.index.intent,
      })
      .then((res) => {
        console.log(res);
        this.catdialog = false;
        this.$nuxt.$loading.start();
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        this.catdialogError = err.message;
      })
      .finally(() => {
        this.catUpdateProgressRunning = false;
      });
  }

  get needCat() {
    return this.item.index.cat.length < 1;
  }
  get needIntent() {
    return this.item.index.intent.length < 1;
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






