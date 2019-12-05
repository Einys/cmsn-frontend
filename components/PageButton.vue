<template>
  <div class="pagenation">
    <v-btn
      fab
      depressed
      class="blue-grey--text"
      color="blue-grey lighten-5"
      style="position: absolute; left: 0"

      @click="toFirst()"
    >
      <v-icon>mdi-page-first</v-icon>
    </v-btn>
    <v-btn fab depressed @click="toPrevious()" :disabled="!hasPrevious" class="blue-grey--text" color="blue-grey lighten-5">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    &nbsp;&nbsp;
    .. {{pageNum}} ..
    &nbsp;&nbsp;
    <v-btn fab depressed @click="toNext()" :disabled="!hasNext" class="blue-grey--text" color="blue-grey lighten-5">
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
  margin: 8px auto;
  font-size: 22px;
  text-align: center;
  color: #2a3142;
  position: relative;

}
</style>
