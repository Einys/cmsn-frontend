<template>


    <div
      class="masonry"
      v-masonry
      transition-duration="0s"
      item-selector=".item"
      :gutter="masonryGutter"
    >
      <div
        v-masonry-tile
        v-for="(item, index) in list"
        :key="index"
      >
        <item-card :class="['item', {article: isArticle, ad: item.id ==='ad'}]" :item="item" :isArticle="isArticle"></item-card>
      </div>
    </div>

</template>
<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';

import ItemCard from "@/components/item/Card.vue";


@Component({
  name: "masonry",
  components: {
    ItemCard
  },
  filters: {
    myFilter(value: any) {
      return "Hello filter";
    }
  }
})
export default class Masonry extends Vue {

  @Prop()
  list!: any[];

  @Prop()
  isArticle!: boolean;

  breakPoint = {
    xs: 480,
    sm: 720,
    md: 1200
  };

  mounted() {
    console.log("Masonry mounted");
  }

  get masonryGutter() {
    if(process.client){
      if (window.innerWidth <= 720) return 6;
      else if (window.innerWidth <= 1200) return 12;
      else return 24;
    }else{

    }
  }

}
</script>

<style lang="scss">
$break-large: 1200px;
$break-small: 720px;
$small-column-width: calc((100% - 6px * 1) / 2);
$medium-column-width: calc((100% - 12px * 2) / 3);
$large-column-width: calc((100% - 24px * 3) / 4);

.item {
    background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 14px 0 rgba(180, 167, 163, 0.22);
  border-radius: 4px;
    padding: 2px;
  margin: 12px 0px;
  text-align: left;
  position: absolute;
  width: $large-column-width;
  border-radius: 4px;
  box-sizing: border-box;

}
.item.ad{
  background-color: rgba(134, 134, 134, 0.1);
}

@media screen and (max-width: $break-large) {
  .masonry-wrapper {
    padding: 0px;
  }
  .item {
    width: $medium-column-width;
    margin: 6px 0px;
  }
}

@media screen and (max-width: $break-small) {
  .item {
    width: $small-column-width;
    padding: 1px;
    overflow: hidden;
    margin: 3px 0px;
    box-shadow: 0px 0px 4px 0px rgba(126, 117, 114, 0.3);
  }
}

@media screen and (max-width: 550px) {
  .item.article {
    width: 100%;
    margin: 10px 0px;
    box-shadow: 0px 0px 6px 0px rgba(126, 117, 114, 0.3);
  }
}

</style>

