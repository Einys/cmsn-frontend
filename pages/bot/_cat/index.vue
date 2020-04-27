<template>
	<div style="height: 100%; display: flex; justify-content: center; align-items: center;">
    {{ cat | cat }} 커미션 홍보봇
		<div v-if="!limit" style="text-align:center; display:block">

			봇 리밋까지

			<h1>{{300 - count}}</h1>

			트윗 남았어요.
		</div>
    <div v-else>

    </div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import cmsnService from "@/services/cmsn";

@Component({
  asyncData({ params, error }) {
    return cmsnService
      .getBotLimit(params.cat)
      .then(res => {
        return { limit: res.data.limit, count: res.data.count };
      })
      .catch(err => {
        console.error(err);
        error({ statusCode: 500, message: "Server error" });
      });
  },
  filters: {
    cat(cat: any) {
      switch (cat) {
        case "art":
          return "그림";
          break;
        case "wri":
          return "글";
          break;
        case "des":
          return "디자인";
          break;
        case "mus":
          return "음악";
          break;
        default:
          return "";
      }
    }
  }
})
export default class BotStatus extends Vue {
  get cat() {
    return this.$route.params.cat;
  }
}
</script>

<style scoped>
</style>
