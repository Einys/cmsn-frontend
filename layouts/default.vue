<template>
	<v-app :style="{background : $vuetify.theme.themes['light'].background}">
		<v-app-bar app clipped-right>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title @click="$router.push('/')" style="cursor:pointer">CM-SN.ART</v-toolbar-title>
			<v-spacer></v-spacer>
			<!--<v-btn @click="throwError()" color="error">Make error</v-btn>-->
			<v-btn text v-if="!$vuetify.breakpoint.mdAndUp" @click="searchDrawer = !searchDrawer"><span class="body-1">카테고리</span></v-btn>

			<v-btn v-if="false" outlined rounded color="blue" :href="server + '/auth/twitter'" target="_blank"><v-icon left>mdi-twitter</v-icon>로그인</v-btn>
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
					<v-list-item-title class="font-weight-bold">CM-SN.ART</v-list-item-title>
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
		<v-navigation-drawer app clipped :permanent="$vuetify.breakpoint.mdAndUp" right color="background" v-model="searchDrawer">
			<v-container justify-center style="text-align:center">
				<h2 class="font-weight-light mt-3">커미션 열었어요</h2>
				<v-layout row wrap align-center justify-space-around style="font-size: 20px;">
					<v-btn color="blue-grey" text x-large :to="{path:'/t/art/open'}">
						<v-icon left>mdi-satellite</v-icon>그림
					</v-btn>
					<v-btn color="blue-grey darken-2" text x-large :to="{path:'/t/wri/open'}">
						<v-icon left>mdi-text</v-icon> 글..
					</v-btn>
					<v-btn color="blue-grey darken-2" text x-large :to="{path:'/t/des/open'}">
						<v-icon left>mdi-shape</v-icon> 디자인..
					</v-btn>
					<v-btn color="blue-grey" text x-large :to="{path:'/t/mus/open'}">
						<v-icon left>mdi-music-note</v-icon> 음악..
					</v-btn>

				</v-layout>
				<v-divider></v-divider>
				<h2 class="font-weight-light mt-5">커미션 찾습니다</h2>
				<v-layout row wrap align-center justify-space-around>
					<v-btn color="blue-grey" text x-large :to="{path:'/t/art/find'}">
						<v-icon left>mdi-satellite</v-icon>그림
					</v-btn>
					<v-btn color="blue-grey darken-2" text x-large :to="{path:'/t/wri/find'}">
						<v-icon left>mdi-text</v-icon> 글..
					</v-btn>
					<v-btn color="blue-grey darken-2" text x-large :to="{path:'/t/des/find'}">
						<v-icon left>mdi-shape</v-icon> 디자인..
					</v-btn>
					<v-btn color="blue-grey" text x-large :to="{path:'/t/mus/find'}">
						<v-icon left>mdi-music-note</v-icon> 음악..
					</v-btn>
				</v-layout>
        <br>
        <ad-sq200></ad-sq200>

			</v-container>
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
import AdSquare200 from "@/components/ads/AdSquare200.vue"

export default Vue.extend({
  name: "App",
  components: {
    Masonry,
    "my-footer": Footer,
    "ad-sq200": AdSquare200
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
  watch: {
    $route(to, from) {
			console.log("Route change detected. Reload Ad ");

			//@ts-ignore
			if(googletag && typeof googletag.pubads === 'function' ) { googletag.pubads().refresh(); }

    }
  }
});
</script>
<style lang="scss">
.v-toolbar {
  flex: none !important;
  z-index: 5;
}
.v-app-bar {
  box-shadow: 0px 0px 6px 2px rgba(26, 23, 23, 0.1) !important;
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



@media screen and (max-width: 720px) {
  .wrapper {
    padding: 24px 2px;
  }
  nav {
	  z-index: 100 !important;
  }
}
</style>
