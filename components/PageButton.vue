<template>
  <div class="pagenation">
    <v-btn fab text @click="toPrevious()" :disabled="!hasPrevious" class="orange--text text--darken-1">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    &nbsp;&nbsp;
    .. {{pageNum}} ..
    &nbsp;&nbsp;
    <v-btn fab text @click="toNext()" :disabled="!hasNext" class="orange--text text--darken-1">
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

<style lang="scss" scoped>
.pagenation {
  margin: 20px auto;
  font-size: 22px;
  text-align: center;
  color: #43586b;
  position: relative;
}

.pagenation > button {
  width: 50px !important;
  height: 50px !important;
  border-radius: 12px !important;
}

@media screen and (max-width: $break-large) {
  .pagenation {
    margin: 12px auto;
  }
}

</style>
