<template>
<div>
		<v-container v-if="myUser" align='start'>
			<v-row dense>
				<v-col cols="12">
					<v-card to="/mypage/items" class="mx-auto overflow-hidden">
						<v-card-title>
							나의 홍보
						</v-card-title>
						<v-card-text>
							<v-row>
								<masonry v-if="myUser._items[0]" :list="myUser._items"></masonry>
								<v-col v-else> 홍보한 내용이 없습니다.</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols="12">
					<v-card to="/mypage/following" class="mx-auto overflow-hidden">
						<v-card-title>
							팔로우 중인 홍보
						</v-card-title>
						<v-card-text>
							<v-row>
								<masonry v-if="myUser._items[0]" :list="myUser._items"></masonry>
								<v-col v-else> 팔로우 중인 사람의 홍보가 없습니다.</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="12">
					<v-card to="/mypage/following" class="mx-auto overflow-hidden">
						<v-card-title>
							마음함
						</v-card-title>
						<v-card-text>
							<v-row>
								<masonry v-if="myUser._items[0]" :list="myUser._items"></masonry>
								<v-col v-else> 아직 아무것도 없습니다.</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

		</v-container>

</div>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Navigation from "@/components/mypage/navigation.vue";
import Masonry from "@/components/Masonry.vue";

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
    "my-nav": Navigation,
    Masonry
  }
})
export default class MypagePage extends Vue {
  followingList = [];

  logout() {
    return this.$axios.get("/logout");
  }
  mounted() {}
  async getfollowing(cursor?) {
    const res = await this.$axios.get("/1.0/data/users/mypage/friends", {
      params: { cursor: cursor || "-1" }
    });
    this.followingList.push(res.data.users);
    if (res.data.next_cursor_str !== "0") {
      return this.getfollowing(res.data.next_cursor_str);
    } else {
      return;
    }
  }

  get myUser() {
    return this.$store.state.myUser;
  }
}
</script>

<style scoped>
</style>
