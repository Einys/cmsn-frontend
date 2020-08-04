import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class MyMixin extends Vue {
  myMixinValue = 'Fetch my mixin';
  profileImageError = false;
  onProfileImageError($event) {
    if (!this.profileImageError) {
      this.profileImageError = true;
      $event.target.src = require("@/assets/default.jpg");
    }
  }
  get authUser() {
    return this.$store.state.authUser;
  }

  get profilePic() {
    return this.authUser.photos[0].value!.replace("_normal", "");
  }
}
