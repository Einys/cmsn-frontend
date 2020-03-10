<template>
	<div class="wrapper" >
    <div style="text-align:center">
    <a :href="twitterUser" target="_blank">
		<v-row justify="center">
			<v-avatar size="48" class="avatar">
				<img :src="user.profileImg" @error="onProfileImageError($event)" />
			</v-avatar>

		</v-row>

			<v-row class="username my-3" justify="center" align="center">
				<span>
					<h2>{{user.name}}&nbsp;&nbsp;</h2>
				</span>
        <v-btn depressed rounded dark color="blue">트위터 <v-icon right color="white">mdi-twitter</v-icon></v-btn>
			</v-row>
		</a>
    <div>


    </div>
    </div>


		{{user}}
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import cmsnService from "@/services/cmsn";

@Component({
  async asyncData({ params, $axios }) {
    const data = await $axios
      .$get("/1.0/data/users/name/" + params.name)
      .then(res => {
        return res;
      });
    return { user: data };
  },
  head() {
    return {
      title: `${this.user.name}의 커미션`
    };
  }
})
export default class Users extends Vue {
  user:any

  title: "hello world!";
  get twitterUser(){
    return 'https://twitter.com/' + this.user.name
  }
  error = false;

  onProfileImageError($event: any) {
    if (!this.error) {
      this.error = true;
      $event.target.src = require("@/assets/default.jpg");
    }
  }
}
</script>

<style scoped>
.username{
  color: #242627;
}
</style>
