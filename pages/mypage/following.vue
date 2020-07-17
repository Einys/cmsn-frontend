<template>
	<v-container fluid fill-height>
		<my-nav></my-nav>
		<v-chip class="ma-2" color="orange" text-color="white">
			<span class="font-italic">beta</span>
		</v-chip>
		<v-row align="center" justify="center">

			내가 팔로우한 계정 (최대 1천개) 중 세메센을 이용중인 계정이 있다면 표시합니다. 이 목록은 15분 간격으로 업데이트 할 수 있습니다.
			<v-btn rounded @click="getfriends()">
				팔로잉가져오기
			</v-btn>
			{{followingList}}
		</v-row>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Navigation from "@/components/mypage/navigation.vue";

@Component({
  async asyncData({ store, $axios }) {
    /*
    await store.dispatch("getAuthUser");
    const res = await $axios.get(
      "1.0/data/users/id/" + store.state.authUser.id
    );
    console.log(res);
    return { myuser: res.data };
    */
  },
  components: {
    "my-nav": Navigation
  }
})
export default class MypagePage extends Vue {
  followingList: any[] = [];
  getCount = 0;

  logout() {
    return this.$axios.get("/logout");
  }
  async getfriends(cursor?) {
    try {
      if (this.getCount === 0) {
        this.followingList = [];
      }

      const res = await this.$axios.get("/1.0/data/users/mypage/friends/db", {
        params: { cursor: cursor || "-1" }
      });

      this.followingList.push(res.data.db);
      this.getCount++;

      //전부 가져오기..
      if (
        res.data.next_cursor_str !== "0" &&
        res.data.next_cursor !== 0 &&
        this.getCount < 5
      ) {
        return this.getfriends(res.data.next_cursor_str);
      } else {
        this.getCount = 0;
        return;
      }
    } catch (e) {
      console.dir(e);
      if (e.response.status === 429) {
        console.log("too many request");
      } else {
        throw e
      }
    }
  }
}
</script>

<style scoped>
</style>
