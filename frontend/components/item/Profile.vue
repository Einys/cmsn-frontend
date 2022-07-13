<template>
  <a
    :href=" user.name? 'https://twitter.com/'+ user.name : null "
    target="_blank"
    rel="noopener"
  >
    <v-row class="profile" no-gutters>
      <v-avatar size="34" class="avatar">
        <img v-if="user.profileImg"
          :src="user.profileImg"
          @error="onProfileImageError($event)"
        />
        <img v-else src="/default.jpg"/>
      </v-avatar>
      <v-layout column>
      <v-row no-gutters align="center">
      <span v-if="user.name !== null && user.name !== undefined" class="username">{{ user.name }}&nbsp;</span>
      <span v-else class="caption grey--text"> (유저 확인 오류) &nbsp;</span>
      <!-- <v-icon :size="$vuetify.breakpoint.smAndUp? 14 : 14" color="blue">mdi-twitter</v-icon> -->
      </v-row>

      <span
        class="date"
        v-if="departedAt"
      >{{ departedAt | datepassed }}</span>
      </v-layout>

    </v-row>
  </a>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  //
  filters: {
    datepassed(value: any): any {
      if (Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60) < 60) {
        return (
          Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60) +
          " 분 전 홍보"
        );
      } else if (
        Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60 / 60) < 24
      ) {
        return (
          Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60 / 60 - 1) +
          " 시간 전 홍보"
        );
      } else {
        return (
          Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60 / 60 / 24) +
          " 일 전 홍보"
        );
      }
    }
  }
})
export default class Card extends Vue {
  @Prop({ required: true })
  public user: any;
  @Prop({ required: false })
  public departedAt: any;
  error = false;
  mounted() {}
  onProfileImageError($event: any) {
    if(!this.error){
      this.error = true;
      $event.target.src = '/default.jpg';
    }
  }
}
</script>

<style lang="scss">
$break-large: 1200px;
$break-small: 720px;

.profile {
  color: #4b4b4b;
  padding: 12px;
  padding-bottom: 9px;
  font-size: 15px;
  line-height: 16px;
  .avatar{
      float: left;
      margin-right: 8px;
  }
  .margin-right {
    margin-right: 8px;
  }
  .logo-twitter {
    position: relative;
    width: 1em;
    padding-left: 2px;
  }
  .date {
    font-size: 14px;
    color: rgb(138, 155, 175);
  }
  .username {
    margin: 0;
    padding: 0;
    max-width: 120px;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

@media screen and (max-width: $break-large) {
  .wallpaper {
    max-height: 25vw;
    min-height: 13vw;
  }
}

@media screen and (max-width: $break-small) {
  .wallpaper {
    max-height: 50vw;
    min-height: 25vw;
  }

  .profile {

    font-size: medium;
    line-height: 18px;

    .margin-right {
      margin-right: 6px;
    }
    .logo-twitter {

    }
    .date {
      font-size: 0.8em;
    }
    .username {
      max-width: 100px;

    }

  }

  .article .profile {
    padding-bottom: 10px;
    .avatar {
      height: 40px !important;
      width: 40px !important;
      margin-right: 10px;
    }
    .username {
      max-width: none;
    }
  }
}

</style>
