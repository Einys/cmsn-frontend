// myMixin.js
let myMixin = {
  data: () => {
    return { profileImageError: false }
  },
  created() {
  },
  methods:{
      onProfileImageError($event) {
        if (!this.profileImageError) {
          this.profileImageError = true;
          $event.target.src = require("@/assets/default.jpg");
        }
      }
  }
};
export default myMixin;
