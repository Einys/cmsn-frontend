<template>
	<v-container fluid fill-height>

    <my-nav></my-nav>
		<v-row align="center" justify="center">

			<v-btn rounded @click="$router.push('/mypage/following')">
				팔로잉
			</v-btn>

		</v-row>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Navigation from "@/components/mypage/navigation.vue"
@Component({
  async asyncData({ store, $axios }) {
    await store.dispatch("getUser");
    const res = await $axios.get(
      "1.0/data/users/id/" + store.state.authUser.id
    );
    console.log(res);
    return { myuser: res.data };
  },
  components: {
    "my-nav" :Navigation
  }
})
export default class MypagePage extends Vue {
  followingList: [any];

  async getfollowing(cursor?) {
    const res = await this.$axios.get("/1.0/data/users/mypage/friends", {
      params: { cursor: cursor || "-1" }
    });
    this.followingList.push(res.data.users);
    if (res.data.next_cursor_str) {
      return this.getfollowing(res.data.next_cursor_str);
    } else {
      return;
    }
  }
}
</script>

<style scoped>
</style>
