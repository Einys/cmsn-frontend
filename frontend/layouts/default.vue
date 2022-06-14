<template>
	<v-app :style="{background : $vuetify.theme.themes['light'].background}">
		<v-app-bar app :style="{background : $vuetify.theme.themes['light'].background, opacity: 0.96}">
			<span class="blue-grey--text text--darken-2 ma-0" @click="drawer= !drawer" style="cursor:pointer;">
				<v-layout>
					<img style=" height: 28px; " :src="this.$vuetify.breakpoint.smAndDown ? '/logo2020.svg' :'/cmsnart.png'" />
					<v-icon>mdi-chevron-right</v-icon>
				</v-layout>

			</span>
			<v-spacer></v-spacer>
			<!--<v-btn @click="throwError()" color="error">Make error</v-btn>-->
			<v-btn text @click="$router.push('/t')"><span class="body-1">카테고리</span></v-btn>

			<v-btn v-if="false" outlined rounded color="blue" :href="server + '/auth/twitter'" target="_blank">
				<v-icon left>mdi-twitter</v-icon>로그인
			</v-btn>
		</v-app-bar>

		<!--스낵바-->
		<v-snackbar v-model="snackbar" :timeout="3000" top color="cyan darken-2">
			트위터 아이디로 로그인 추가 예정
			<v-btn color="yellow" text @click="snackbar = false">확인</v-btn>
		</v-snackbar>
		<v-snackbar v-model="errorbar" :timeout="3000" top color="cyan darken-2">
			오류 발생. 재시도해 주시거나 관리자에게 문의주세요.
			<v-btn color="yellow" text @click="errorbar = false">확인</v-btn>
		</v-snackbar>
		<!-- 메인 컨텐츠 -->
		<v-content>
			<nuxt />
		</v-content>

		<!-- 왼쪽 서랍 -->
		<v-navigation-drawer app v-model="drawer" temporary>
			<!-- 유저 아바타 나중에 로그인할때 쓰려고 남겨둠
    <template v-slot:prepend>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link two-line>
          <v-list-item-content>
            <v-list-item-title class="title">Sandra Adams</v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </template>
    <v-divider></v-divider>
    -->

			<v-list nav>
				<v-list-item link href="/">
					<v-list-item-icon>
						<v-icon>mdi-home</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="font-weight-bold">홈</v-list-item-title>
				</v-list-item>
				<v-list-item link to="/t">
					<v-list-item-icon>
						<v-icon>mdi-layers</v-icon>
					</v-list-item-icon>
					<v-list-item-title>카테고리</v-list-item-title>
				</v-list-item>
				<v-list-item link to="/help">
					<v-list-item-icon>
						<v-icon>mdi-information</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="font-weight-medium">이용안내</v-list-item-title>
				</v-list-item>
				<v-list-item link href="https://twitter.com/cms_env" target="_blank">
					<v-list-item-icon>
						<v-icon>mdi-note</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="font-weight-medium">공지사항</v-list-item-title>
				</v-list-item>
				<v-list-item link href="https://ko-fi.com/cmsnrt" target="_blank">
					<v-list-item-icon>
						<v-icon>mdi-coffee</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="font-weight-medium">서비스 후원</v-list-item-title>
				</v-list-item>
				<v-list-item link @click="login()">
					<v-list-item-icon>
						<v-icon>mdi-dots-horizontal</v-icon>
					</v-list-item-icon>
				</v-list-item>
			</v-list>
			<my-footer></my-footer>
		</v-navigation-drawer>

		<!-- 오른쪽 서랍 -->
		<v-navigation-drawer app width="300" :permanent="isRightDrawerPermanent" right color="background" v-model="searchDrawer" style="overflow:hidden">
			<v-btn v-if="!isRightDrawerPermanent" absolute top right text @click="searchDrawer=false">
				<v-icon>mdi-close</v-icon>
			</v-btn>
      <cat-vert style="margin-top:3px"></cat-vert>
			<br>
			<ad-vt300></ad-vt300>

		</v-navigation-drawer>

		<!-- 모바일용 하단 네비게이션 -->
		<v-bottom-navigation v-model="bottomNav" app v-if="false && $vuetify.breakpoint.mdAndDown">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-btn value="recent" href="/">
				<v-icon>mdi-home</v-icon>
			</v-btn>
			<v-btn @click="searchDrawer = !searchDrawer">
				<span style="font-weight:bold">카테고리</span>
			</v-btn>
			<v-btn value="nearby" @click="login()">
				<v-icon>mdi-dots-horizontal</v-icon>
			</v-btn>
		</v-bottom-navigation>

	</v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Masonry from "@/components/Masonry.vue";
import Footer from "@/components/Footer.vue";
// @ts-ignore
import objectFitImages from "object-fit-images";
import cmsnService from "@/services/cmsn";
import AdVert300 from "@/components/ads/AdVert300.vue";
import CatVert from "@/components/cat/Vert.vue";

export default Vue.extend({
  name: "App",
  components: {
    Masonry,
    "cat-vert":CatVert,
    "my-footer": Footer,
    "ad-vt300": AdVert300
  },
  data: () => ({
    //
    snackbar: false,
    errorbar: false,
    drawer: false,
    searchDrawer: false,
    bottomNav: true,
    sheet: false,
    keyword: "",
    server: process.env.VUE_APP_SERVER_URL
  }),
  methods: {
    login() {
      this.snackbar = true;
      //cmsnService.login().catch(err => {console.log(err)})
    },
    search(e: any) {
      console.log("search", this.keyword);
      if (this.$route.path === "/t") {
        console.log("list search");
        this.$router.push({
          query: { q: this.keyword }
        });
      } else {
        console.log("new search");
        this.$router.push({ path: "/t", query: { q: this.keyword } });
      }
    },
    throwError() {
      throw new Error("error");
    }
  },
  created() {
    objectFitImages(); /* IE, Edge, Safari Polyfill */
    //this.$vuetify.theme.dark = true
    console.log(process.env.NODE_ENV, "node env");
  },
  computed: {
    isRightDrawerPermanent() {
      return this.$vuetify.breakpoint.lgAndUp;
    }
  },
  watch: {
    $route(to, from) {
      console.log("Route change detected. Reload Ad ");

      //@ts-ignore
      if (googletag && typeof googletag.pubads === "function") {
        googletag.pubads().refresh();
      }
    }
  }
});
</script>
<style lang="scss">
.v-toolbar {
  flex: none !important;
  z-index: 5;
}
.v-toolbar__content {
  padding: 10px 24px;
}
.v-app-bar {
  box-shadow: 0px 0px 5px 2px rgba(26, 23, 23, 0.01) !important;
}

.toolbar-search {
  margin: 16px auto !important;
}
.toolbar-search.v-input * {
  height: 100%;
  min-height: 0 !important;
  margin: 0;
}
.toolbar-search .v-input__slot {
  border-radius: 20px !important;
  margin: 0 !important;
  background-color: #e7e7e7 !important;
}

.wrapper {
  width: 100%;
  max-width: 1280px !important;
  padding: 24px;
  margin: 0 auto;
}

// 오른쪽 서랍의 이상한 경계선 제거
.theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
  background-color: transparent !important;
}

.v-btn__content .v-icon.v-icon--left, .v-btn__content .v-icon.v-icon--right{
  font-size: 24px;
}

@media screen and (max-width: 720px) {
  .v-toolbar__content {
    padding: 10px 16px;
  }
  .wrapper {
    padding: 24px 16px;
  }
  nav {
    z-index: 100 !important;
  }
}
</style>
