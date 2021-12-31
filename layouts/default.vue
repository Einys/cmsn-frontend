<template>
	<v-app id="inspire" :style="{background : $vuetify.theme.themes['light'].background}">
		<v-app-bar app :style="{background : $vuetify.theme.themes['light'].background}" style="opacity:0.9" flat>
			<v-container class="py-0 fill-height">

				<v-row >
					<v-col>
						<v-row align-content="center">
							<span class="blue-grey--text text--darken-2 ma-0" @click="drawer= !drawer" style="cursor:pointer; box-sizing:border-box; align-item:center">
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
						</v-row>


					</v-col>

					<v-col cols="2" v-if="isRightColVisible">


					</v-col>


				</v-row>

			</v-container>
		</v-app-bar>

		<v-main>
			<v-container>
				<v-row>
					<v-col>
						<v-sheet color="transparent" min-height="70vh" rounded="lg">
							<nuxt />
						</v-sheet>
					</v-col>
					<v-col cols="2" v-if="isRightColVisible">
						<v-sheet rounded="lg">
							<v-list color="transparent">
								<v-list-item v-for="n in 5" :key="n" link>
									<v-list-item-content>
										<v-list-item-title>
											List Item {{ n }}
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-divider class="my-2"></v-divider>

								<v-list-item link color="grey lighten-4">
									<v-list-item-content>
										<v-list-item-title>
											Refresh
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-sheet>
					</v-col>

				</v-row>
			</v-container>
		</v-main>

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
	</v-app>
</template>

<script>
export default {
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
	drawer: false
  }),
  computed: {
	isRightColVisible() {
      return this.$vuetify.breakpoint.lgAndUp;
    }
  }
};
</script>


<style lang="scss">


</style>