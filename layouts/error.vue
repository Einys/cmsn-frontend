<template>
  <v-app>
  <v-container fill-height>
    <v-col justify='center' align='center'>


      <v-card flat max-width="420">
        <v-img max-width="420" src="https://images.unsplash.com/photo-1535696588143-945e1379f1b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"></v-img>

        <v-card-title>
          <h1 v-if="error.statusCode === 404">
            <v-icon>mdi-alert</v-icon> CODE 404 Page not found
          </h1>
          <h1 v-else>An Error occurred</h1>
        </v-card-title>
        <v-card-text>
          <p v-if="error.statusCode !== 404">
            어..? 예상치 못한 일이 일어났습니다.
          </p>
          <v-divider></v-divider>

          <p>
            {{error.stack}}
          </p>
          <p v-if="error.statusCode === 404">
            찾으시는 페이지가 없어졌거나 다른 곳으로 이동했습니다.
            <!-- {{error.message}} -->
          </p>
          <p v-else>
            관리자에게 오류 보고서가 전달되었습니다. 원인을 알아내는 대로 고쳐질 것입니다.
            <!-- {{error.message}} -->
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="cyan darken-1"
            @click="reload"
          > 새로고침 </v-btn>

          <v-spacer></v-spacer>
            <v-btn
              @click="$router.back()"
              text
              color="blue-grey"
            > 뒤로가기 </v-btn>
          <NuxtLink to="/">
            <v-btn
              text
              color="cyan darken-1"
            > 메인으로<v-icon right>mdi-home</v-icon> </v-btn>
          </NuxtLink>
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
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
