<template>
	<div>
		<v-row v-if="!isUserEmpty" class="profile pa-2 py-3" no-gutters>
			<v-avatar size="32" class="avatar">
				<img :src="user.profileImg" @error="onProfileImageError($event)" />
			</v-avatar>
			<v-layout column>
				<v-row no-gutters align="center">
					<span class="username">{{ userName }}&nbsp;</span>
					<v-icon :size="$vuetify.breakpoint.smAndUp? 14 : 12" color="grey">mdi-twitter</v-icon>
				</v-row>

				<span class="date" v-if="departedAt">{{ departedAt | datepassed }}</span>
			</v-layout>
		</v-row>

		<v-row v-else class="profile pa-2 py-3" no-gutters>
			<v-avatar size=32>
				<img src="error" @error="onProfileImageError($event)" />
			</v-avatar>
			<v-layout column>
				<v-row no-gutters align="center">
					<span class="username">&nbsp;유저 데이터 없음&nbsp;</span>
					<v-icon :size="$vuetify.breakpoint.smAndUp? 14 : 12" color="grey">mdi-twitter</v-icon>
				</v-row>
			</v-layout>
		</v-row>
	</div>

</template>
<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import ProfileMixin from "@/components/mixin/profile.ts";
import ItemMixin from "@/components/mixin/item.ts";
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
          Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60 / 60) +
          " 시간 전 홍보"
        );
      } else {
        return (
          Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60 / 60 / 24) +
          " 일 전 홍보"
        );
      }
    },
  },
})
export default class Card extends Mixins(ProfileMixin, ItemMixin) {
  @Prop({ required: true, default: {} })
  public user: any;
  @Prop({ required: false })
  public departedAt: any;
  error = false;
  twitterUser = this.user ? "https://twitter.com/" + this.user!.name : null;

  mounted() {}
  onProfileImageError($event: any) {
    if (!this.error) {
      this.error = true;
      $event.target.src = require("@/assets/default.jpg");
    }
  }

  get isUserEmpty() {
    if (this.user) {
      return false;
    } else {
      return true;
    }
  }

  get userName() {
    return this.user!.name;
  }
}
</script>

<style lang="scss">
$break-large: 1200px;
$break-small: 720px;

.profile {
  color: #4b4b4b;
  padding: 10px 8px;
  font-size: 15px;
  line-height: 16px;
  .avatar {
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
    font-size: 12px;
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
    padding: 2px;
    line-height: 14px;
    .avatar {
      width: 28px;
      height: 28px;
    }
    .margin-right {
      margin-right: 6px;
    }
    .logo-twitter {
    }
    .date {
      font-size: 11px;
    }
    .username {
      max-width: 80px;
    }
  }
}
</style>
