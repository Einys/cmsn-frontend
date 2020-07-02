<template>
	<div class="wrapper" v-if="user">


			<v-row align="center" no-gutters>
				<v-avatar size="120" class="avatar my-1 mr-5">
					<img :src="user.profileImg" @error="onProfileImageError($event)" />
				</v-avatar>
        <span>
          <span class="username"> {{user.profileName}} </span>
          <a :href="twitterUser" target="_blank">
          <div>
            {{user.name}}&nbsp;<v-icon small color="blue">mdi-twitter</v-icon>
          </div>
          </a>
        </span>

			</v-row>

      <v-row v-if="!itemIsEmpty">
        <v-col v-for="item in user._items" :key="item.id">
          <v-card>
          <v-row align="center">
            <v-col cols="12" sm="12">
              <images :images="item.attachment"></images>
            </v-col>
            <v-col>
              {{item.text}}
            </v-col>
          </v-row>
          </v-card>

        </v-col>

      </v-row>


		<div>

		</div>

		{{user}}
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import cmsnService from "@/services/cmsn";
import Masonry from "@/components/Masonry.vue";
import Images from "@/components/item/Images.vue";
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
  },
  components:{
    Masonry,
    Images
  }
})
export default class Users extends Vue {
  user: any;

  title: "hello world!";
  get twitterUser() {
    return "https://twitter.com/" + this.user.name;
  }
  get itemIsEmpty() {
    return this.user ? ( Array.isArray(this.user._items) ? false : true ) : true;
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
.username {
  color: #242627;
  font-size: 38px;
  font-weight: bold;
}
</style>
