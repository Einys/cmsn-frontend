<template>
  <v-app>
  <v-container fill-height>
    <v-col justify='center' align='center'>


      <v-card flat max-width="420">
        <v-img max-width="420" src="https://images.unsplash.com/photo-1535696588143-945e1379f1b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"></v-img>

        <v-card-text>
          <p>
            어...? 문제가 발생했습니다. <br>
          </p>
        </v-card-text>
        <v-card-title>
          <h1 v-if="error.statusCode === 404">
            <v-icon>mdi-alert</v-icon> 404 Page not found
          </h1>
        </v-card-title>

        <v-card-actions>
            <v-btn
              @click="$router.back()"
              text
              color="blue-grey"
            > 뒤로가기 </v-btn>
            <NuxtLink to="/">
              <v-btn
                text
                color="cyan darken-1"
              > 메인으로&nbsp;<v-icon size=16>mdi-home</v-icon></v-btn>
            </NuxtLink>
          <v-spacer></v-spacer>
          <a href="https://twitter.com/cms_env">
            <v-btn
              @click="$router.back()"
              text
              color="blue-grey"
            > <v-icon size=14 color="grey">mdi-twitter</v-icon>&nbsp;관리자 트위터로 </v-btn>   
          </a>
       

        </v-card-actions>

      </v-card>
    <v-layout
      justify-center
      class=" text-xs-center"
    >
      <p class="caption ma-1 px-3 grey--text text--lighten-1 "> 커미션 서치 사이트 cm-sn.art</p>
    </v-layout>
    </v-col>

  </v-container>

  </v-app>
</template>

<script>
import cmsnService from '@/services/cmsn'
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  methods: {
    reload() {
      window.location.reload(true);
    }
  },
  mounted(){
    console.error(this.error)
    cmsnService.reportError(this.error.message, this.error.stack)
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
