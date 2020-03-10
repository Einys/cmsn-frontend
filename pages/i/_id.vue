<template>
	<div class="wrapper itempage">
		<div style="margin:0 auto; max-width:720px">
			<v-card flat class="pa-5 mb-5" :inner-html.prop="text | text">
			</v-card>
      <h3>링크</h3>
			<div v-for="(link) in item.links" :key="link._id">
        <v-card flat>
          <v-row :dense="$vuetify.breakpoint.smAndDown" style="height:200px; max-height:24vw; overflow: hidden; text-overflow: ellipsis;">
            <v-col cols="4"><v-img :src="MediaSourceOfLink(link)" aspect-ratio="1.2"/></v-col>
            <v-col cols="8">
              <div class="caption">{{link.display_url}}</div>
              <div class="mt-2 font-weight-bold">{{link.meta.title}}</div>
              <div class="caption" style="">{{link.meta.description}}</div>
            </v-col>
          </v-row >

        </v-card>
        {{link}}
			</div>
        {{item.links}}

      <div>

		</div>

		<div class="pa-5">
			{{item}}

		</div>
    <div class="pa-5">
      {{item.links}}
    </div>
	</div>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ItemCard from "@/components/item/Card.vue";
import Images from "@/components/item/Images.vue";
import MImage from "@/components/methods/image"

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
    const data = await $axios.$get("/1.0/data/items/" + params.id).then(res => {
      return res;
    });
    return { item: data };
  },
  head() {
    return {
      title: `${this.item._user.name}의 커미션`
    };
  }
})
export default class ItemPage extends Vue {
  item:any;

  get text(){
    return this.item? this.item.text : null
  }
  MediaSourceOfLink( link ){
    return MImage.getMediaSourceOfLink(link)
  }
}
</script>

<style>
.itempage .highlight {
  color: #ff7b7b;
}
</style>






