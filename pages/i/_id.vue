<template>
	<div class="wrapper itempage">
		<div style="margin:0 auto; max-width:720px">
			<v-card flat>
				<images :images="thumbImages" />
			</v-card>

			<v-card flat class="pa-5 mb-2" :inner-html.prop="text | text">

			</v-card>
      <a :href="`https://twitter.com/${item._user.name}/status/${item.id}`" target="_blank">
      <v-btn style="width:100%" rounded depressed color="white"><v-icon color="blue">mdi-twitter</v-icon></v-btn>

      </a>
			<div class="mt-4" v-if="item && item.links && Array.isArray(item.links) && item.links[0]">

				<h3>링크된 페이지</h3>
				<div v-for="(link) in item.links" :key="link._id">
					<v-card flat>
						<v-row no-gutters style="overflow: hidden; text-overflow: ellipsis;">
							<v-col cols="4">
								<v-img v-if="MediaSourceOfLink(link)" :src="MediaSourceOfLink(link)" aspect-ratio="1.2" />
							</v-col>
							<v-col cols="8" class="pa-3">
								<div class="caption">{{link.display_url}}</div>
								<div v-if="link.meta">
									<div class="mt-2 font-weight-bold">{{link.meta.title}}</div>
									<div class="caption" style="">{{link.meta.description}}</div>
								</div>
							</v-col>
						</v-row>

					</v-card>
					{{link}}
				</div>
			</div>
			{{item.links}}

			<div>

			</div>

			<div class="pa-5">
				{{item}}

			</div>

		</div>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ItemCard from "@/components/item/Card.vue";
import Images from "@/components/item/Images.vue";
import MImage from "@/components/methods/image";

@Component({
  filters: {
    text(value: string) {
      return value
        .replace(/<script>/g, " ")
        .replace(/(?:\r\n|\r|\n)/g, "<br/>")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/:\/\/link/g, '<span class="highlight">(링크)</span>');
    }
  },
  async asyncData({ params, $axios }) {
    const data = await $axios
      .$get("/1.0/data/items/" + params.id, { timeout: 5000 })
      .then(res => {
        return res;
      });
    return { item: data };
  },
  head() {
    return {
      title: `${this.item._user.name}의 커미션`
    };
  },
  components: {
    Images
  }
})
export default class ItemPage extends Vue {
  item: any;

  get text() {
    return this.item ? this.item.text : null;
  }
  MediaSourceOfLink(link) {
    return MImage.getMediaSourceOfLink(link);
  }
  get thumbImages() {
    return MImage.thumbImages(this.item);
  }
}
</script>

<style>
.itempage .highlight {
  color: #ff7b7b;
}
</style>






