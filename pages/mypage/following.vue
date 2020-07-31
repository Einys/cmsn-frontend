<template>
	<v-container fluid fill-height>

		<v-row align="center" justify="center">

			<v-alert type="info" outlined>
        <v-row no-gutters>
          <v-col>
						내가 팔로우한 계정(최대 1천개) 중 세메센에 홍보중인 계정이 있다면 표시합니다. 이 목록은 15분 간격으로 업데이트 할 수 있습니다.

          </v-col>

        </v-row>

						<v-btn rounded color="white" class="blue--text" @click="getfriends()">업데이트</v-btn>


			</v-alert>

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
export default class MypageFollowingPage extends Vue {
  followingList: any[] = [];
  getCount = 0;

  logout() {
    return this.$axios.get("/logout");
  }
  mounted() {
    this.getfriends();
  }
  async getfriends() {
    try {
      this.followingList = [];
      const res = await this.$axios.get("/1.0/data/users/mypage/friends/db");
      this.followingList.push(res.data);
    } catch (e) {
      console.dir(e);
      if (e.response.status === 429) {
        console.log("too many request");
      } else {
        throw e;
      }
    }
  }
}
</script>

<style scoped>
</style>
