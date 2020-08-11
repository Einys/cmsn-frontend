<template>
	<div class="wrapper itempage">
		<div style="margin:0 auto; max-width:720px">

			<v-card flat class="mb-5">
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
						{{item.departedAt | datepassed}}
					</v-btn>

					<v-spacer></v-spacer>
					<v-btn text color="grey" fab small @click="likebtnclick" class="btn-like">
						<v-icon>mdi-heart-outline</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>

			<v-row no-gutters="" class="grey--text text--darken-1">
				<v-icon left>mdi-link-variant</v-icon> 링크된 외부 페이지
			</v-row>

			<v-card flat class="mt-1" :href="`https://twitter.com/${item._user.name}/status/${item.id}`" target="_blank">
				<v-card-text>
					<v-icon left color="blue">mdi-twitter</v-icon> twitter.com/{{item._user.name}}/status...

				</v-card-text>
			</v-card>

			<div class="mt-2" v-if="item && item.links && Array.isArray(item.links) && item.links[0]">

				<div v-for="(link) in item.links" :key="link._id">
					<v-card flat :href="link.expanded_url" target="_blank">
						<v-row align="center" style="overflow: hidden; text-overflow: ellipsis;">
							<v-list-item>
								<v-list-item-avatar size="100" tile>

									<img width="100%" :src="MediaSourceOfLink(link)" @error="onItemImageError($event, image+'linkthumb')" />

								</v-list-item-avatar>
								<v-list-item-content>
									<div class="caption">
										<v-icon x-small left>mdi-link</v-icon>{{link.display_url}}
									</div>
									<div v-if="link.meta">
										<v-list-item-title>
											<div class="mt-2 font-weight-bold">{{link.meta.title}}</div>

										</v-list-item-title>
										<div class="caption" style="max-height:48px; overflow: hidden; line-height:1.3em; padding-top:4px">{{link.meta.description}}</div>
									</div>
								</v-list-item-content>
							</v-list-item>

						</v-row>

					</v-card>

				</div>
			</div>
			<v-card flat v-if="item._user" class="mt-5 mb-5">
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
				<v-row justify="center" align="center">
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
import MImage from "@/components/methods/image";
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

  get imagesWithoutFirst(){
    return this.images.slice(1)
  }

  get text() {
    return this.item ? this.item.text : null;
  }
  MediaSourceOfLink(link) {
    return MImage.getMediaSourceOfLink(link);
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






