<template>
  <div class="pagenation">
    <v-btn
      fab
      depressed
      color="blue-grey lighten-5"
      class="blue-grey--text"
      style="position: absolute; left: -2px"

      @click="toFirst()"
    >
      <v-icon>mdi-page-first</v-icon>
    </v-btn>
    <v-btn fab depressed @click="toPrevious()" :disabled="!hasPrevious" color="brown lighten-5" class="brown--text">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    &nbsp;&nbsp;
    .. {{pageNum}} ..
    &nbsp;&nbsp;
    <v-btn fab depressed @click="toNext()" :disabled="!hasNext" color="brown lighten-5" class="brown--text">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  //
})
export default class Card extends Vue {
  @Prop({ required: true })
  public pageNum! : string;
  @Prop({ required: true })
  public hasPrevious! :boolean;
    @Prop({ required: true })
  public hasNext! : boolean;
  mounted() {}

  toFirst() {
    this.$router.push({ query: { ...this.$route.query, page: "1" } });
  }
  toPrevious() {
    let page = parseInt(this.pageNum) - 1;
    this.$router.push({
      query: { ...this.$route.query, page: page.toString() }
    });
  }
  toNext() {
    let page =  parseInt(this.pageNum) + 1;
    this.$router.push({
      query: { ...this.$route.query, page: page.toString() }
    });
  }
}
</script>

<style lang="scss">
.pagenation {
  margin: 20px auto;
  font-size: 22px;
  text-align: center;
  color: #666666;
  position: relative;

}
</style>
