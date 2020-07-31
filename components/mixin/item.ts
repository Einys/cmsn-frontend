// myMixin.js
let myMixin = {
  data: () => {
    return { itemImageError: false }
  },
  created() {
  },
  filters: {
    cat(cat: any) {
      switch (cat) {
        case "art":
          return "그림";
          break;
        case "wri":
          return "글";
          break;
        case "des":
          return "디자인";
          break;
        case "mus":
          return "음악";
          break;
        default:
          return "";
      }
    },
    intent(intent: any) {
      if (intent === "open") return "열었어요";
      else if (intent === "find") return "찾습니다";
    },
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
    text(value: string) {
      return value
        .replace(/<script>/g, " ")
        .replace(/(?:\r\n|\r|\n)/g, "<br/>")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/:\/\/link/g, '<span class="highlight">(link)</span>');
    }
  },
  methods:{
      onItemImageError($event) {
        if (!this.itemImageError) {
          this.itemImageError = true;
          $event.target.src = require("@/assets/404.jpg");
        }
      },
      onEmptyItem($event){
        $event.target.src = require("@/assets/thumbnail.jpg");
      }
  }
};
export default myMixin;
