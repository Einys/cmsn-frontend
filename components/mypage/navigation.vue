<template>

		<v-menu tile transition="slide-y-transition" offset-y style="left:0">
			<template v-slot:activator="{ attrs, on }">
				<v-toolbar color="blue-grey darken-3" dark v-bind="attrs" v-on="on" flat>
					<v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title class="font-weight-bold">
            <v-layout align-center>
          <v-icon>{{activeIcon}}</v-icon> &nbsp;

            {{activeTitle}}
            </v-layout>

            </v-toolbar-title>


				</v-toolbar>
			</template>
			<v-list ref="mymenu">
        <v-list-item exact v-for="menu in menus" :key="menu.title" :to="menu.to" @click="setActive(menu.title, menu.icon)">
					<v-list-item-icon>
						<v-icon>{{menu.icon}}</v-icon>

					</v-list-item-icon>
					<v-list-item-title>{{menu.title}}
						<v-chip x-small style="position:absolute; top:0; right:0" class="ma-2 beta-chip" color="orange" text-color="white">
							<span class="font-italic">beta</span>
						</v-chip>
					</v-list-item-title>

				</v-list-item>

			</v-list>
		</v-menu>


</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class MypageNav extends Vue {

  activeIcon = 'mdi-account'
  activeTitle = '마이페이지'

  menus = [
    {icon: 'mdi-account', title: '마이페이지', to:'/mypage'},
    {icon: 'mdi-account-circle', title: '나의 홍보', to:'/mypage/items'},
    {icon: 'mdi-account-multiple', title: '팔로우 중인 홍보', to:'/mypage/following'},
    {icon: 'mdi-heart', title: '마음함', to:'/mypage/likes'}
  ]

 mounted(){
   const currentmenu = this.menus.find( v => { return v.to === this.$route.path })
   this.setActive(currentmenu.title, currentmenu.icon)
 }
  setActive(title, icon){
    this.activeTitle = title
    this.activeIcon = icon
  }
}
</script>

<style scoped>

.beta-chip{
position:absolute;
top:0;
right:30;
}
</style>
