import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class MyMixin extends Vue {
  myMixinValue = 'Fetch my mixin';
  profileImageError = false;
  profileImageErrorArray = []
  profileErrorImageRoute = '/_nuxt/assets/default.jpg'
  onProfileImageError($event) {
    if (!this.profileImageError) {
      this.profileImageError = true;
      $event.target.src = require( "@/assets/default.jpg" );
    }
  }

  onProfileImageErrorWithKey($event, key) {
    if(!this.profileImageErrorArray[key]){
      this.profileImageErrorArray[key] = true;
      $event.target.src = require( "@/assets/default.jpg" );
    }
  }
  get authUser() {
    return this.$store.state.authUser;
  }

  get profilePic() {
    const pic = this.authUser.photos[0].value
    return pic.replace("_normal", "");
  }

  bigProfilePic( path ){
    return path.replace("_normal", "");
  }

}
