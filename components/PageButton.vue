<template>
  <div class="pagenation">
    <v-btn fab depressed @click="toPrevious()" :disabled="!hasPrevious" class="amber--text text--darken-4">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    &nbsp;&nbsp;
    .. {{pageNum}} ..
    &nbsp;&nbsp;
    <v-btn fab depressed @click="toNext()" :disabled="!hasNext" class="amber--text text--darken-4">
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
  margin: 6px auto;
  font-size: 22px;
  text-align: center;
  color: #43586b;
  position: relative;
}

.pagenation > button {
  width: 48px !important;
  height: 48px !important;
  border-radius: 16px !important;
}

@media screen and (max-width: $break-large) {
  .pagenation {

  }
}

</style>
