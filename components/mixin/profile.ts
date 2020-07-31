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
}
