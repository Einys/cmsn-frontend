<template>
	<div>
    <v-row v-if="busy" justify="center" class="pa-5">
      <v-col cols=6>
        <v-progress-linear indeterminate color="orange"></v-progress-linear>

      </v-col>
    </v-row>
    <v-else>
  		{{favorites}}

    </v-else>
    <v-snackbar
      v-model="toomany"
    >
      리밋입니다. 잠시 후 다시 시도해 주세요.

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {
  favorites = [];
  busy = false;
  toomany = false;
  mounted(){
    this.getfavs()
  }
  async getfavs() {
    try {
      this.busy = true;
      this.favorites = [];
      const res = await this.$axios.get("/1.0/data/users/authenticated/favorites");
      this.favorites = res.data;
    } catch (e) {
      console.dir(e);
      if (e.response.status === 429) {
        console.log("too many request");
        this.toomany = true;
      } else if (e.response.status === 401) {
        window.location.href =
          this.$axios.defaults.baseURL +
          "/auth/twitter?returnTo=" +
          this.$route.fullPath;
      } else {
        this.$nuxt.error(e.message)
      }
    } finally {
      this.busy = false
    }
  }

}
</script>

<style scoped>
</style>
