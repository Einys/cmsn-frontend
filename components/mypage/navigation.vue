<template>
	<v-list full-width>
    <v-list-item two-line>

      <v-list-item-content>
        <v-list-item-title>
          {{myUser.name}}님

        </v-list-item-title>
        <v-list-item-subtitle>
          안녕하세요!
        </v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>
		<v-list-item exact v-for="menu in menus" :key="menu.title" :to="menu.to" @click="setActive(menu.title, menu.icon)">
			<v-list-item-icon>
				<v-icon>{{menu.icon}}</v-icon>

			</v-list-item-icon>
			<v-list-item-title>{{menu.title}}

			</v-list-item-title>

		</v-list-item>

	</v-list>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class MypageNav extends Vue {
  activeIcon = "mdi-account";
  activeTitle = "마이페이지";

  menus = [
    { icon: "mdi-bell", title: "알림", to: '/mypage/notifications'},
    { icon: "mdi-account-circle", title: "나의 홍보", to: "/mypage/items" },
    { icon: "mdi-account-multiple", title: "팔로잉", to: "/mypage/following" },
    { icon: "mdi-heart", title: "마음함", to: "/mypage/likes" },
  ];

  mounted() {

  }
  setActive(title, icon) {
    this.activeTitle = title;
    this.activeIcon = icon;
  }
  get myUser(){
    return this.$store.state.myUser
  }
}
</script>

<style scoped>
.beta-chip {
  position: absolute;
  top: 0;
  right: 30;
}
</style>
