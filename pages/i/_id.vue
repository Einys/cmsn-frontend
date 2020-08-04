<template>
	<div class="wrapper itempage">
		<div style="margin:0 auto; max-width:720px">

			<v-card flat class="mb-5">
				<v-carousel height="400" hide-delimiters show-arrows-on-hover :show-arrows=" ( images && images.length > 1 ) ">
					<v-carousel-item v-for="(image, i) in images" :key="i" >
						<img :src="image" style="width:100%; object-fit:contain" @error="onItemImageError($event, image+'carousel')" />
					</v-carousel-item>
				</v-carousel>
				<v-row justify="center" class="mb-1">
					<v-col v-for="(image, i) in images" :key="i" cols="auto">

						<v-avatar size=60>
							<img :src="image" @error="onItemImageError($event, image+'2')">
						</v-avatar>
						<div style="width: 4px; height: 4px; background-color: grey; margin: 0 auto; border-radius:50%; margin-top: 6px;"></div>

					</v-col>

				</v-row>

				<v-card-text class="body-1 black--text">
					{{text | text}}
				</v-card-text>

				<v-card-actions>
					<v-btn text class="grey--text text--darken-1">
						<v-icon small left >mdi-twitter</v-icon>{{item.departedAt | datepassed}}
					</v-btn>

					<v-spacer></v-spacer>
					<v-btn text color="grey" fab small @click="likebtnclick" class="btn-like" >
						<v-icon>mdi-heart</v-icon>
					</v-btn>
				</v-card-actions>

			</v-card>
			<h3>링크된 페이지</h3>

			<v-card flat class="mt-3" :href="`https://twitter.com/${item._user.name}/status/${item.id}`" target="_blank">
				<v-card-text>
					<v-icon left color="blue">mdi-twitter</v-icon> twitter.com/{{item._user.name}}/status...

				</v-card-text>
			</v-card>

			<div class="mt-3" v-if="item && item.links && Array.isArray(item.links) && item.links[0]">

				<div v-for="(link) in item.links" :key="link._id">
					<v-card flat>
						<v-row no-gutters align="center" style="overflow: hidden; text-overflow: ellipsis;">
							<v-col cols="4">
                <v-avatar tile size=120>
								  <img width="100%" :src="MediaSourceOfLink(link)" @error="onItemImageError($event, image+'linkthumb')" />

                </v-avatar>
							</v-col>
							<v-col cols="8" class="pa-3">
								<div class="caption">{{link.display_url}}</div>
								<div v-if="link.meta">
									<div class="mt-2 font-weight-bold">{{link.meta.title}}</div>
									<div class="caption" style="max-height:40px; overflow: hidden;">{{link.meta.description}}</div>
								</div>
							</v-col>
						</v-row>

					</v-card>

				</div>
			</div>



			<div class="pa-5">
				{{item.links}}<br><br>
				{{item}}

			</div>

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
    return { item: data };
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

  get text() {
    return this.item ? this.item.text : null;
  }
  MediaSourceOfLink(link) {
    return MImage.getMediaSourceOfLink(link);
  }

  get images() {
    return this.thumbImages(this.item);
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






