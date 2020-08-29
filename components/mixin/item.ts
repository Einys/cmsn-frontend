import Vue from 'vue'
import Component from 'vue-class-component'
import datefns from 'date-fns'
@Component({
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
    catadd(cat: any) {
      switch (cat) {
        case "art":
          return "그림";
          break;
        case "wri":
          return "글, 점술..";
          break;
        case "des":
          return "디자인, 공예..";
          break;
        case "mus":
          return "음악, 보이스..";
          break;
        default:
          return "";
      }
    },
    intent(intent: any) {
      if (intent === "open"){
        return "열었어요"
      }
      else if (intent === "find"){
        return "찾습니다"
      } else {
        return "분류 필요"
      }
    },
    coloredIntent(intent: any) {
      if (intent === "open"){
        return '<span style="color: red">열었어요</span>'
      }
      else if (intent === "find"){
        return "찾습니다"
      } else {
        return "분류 필요"
      }
    },
    datepassed(value: any): any {

      if (Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60) < 60) {
        return (
          Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60) +
          "분 전"
        );
      } else if (
        Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60 / 60) < 24
      ) {
        return (
          Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60 / 60) +
          "시간 전"
        );
      } else if( Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60 / 60 / 24) < 30 ) {
        return (
          Math.ceil((Date.now() - Date.parse(value)) / 1000 / 60 / 60 / 24) +
          "일 전"
        );

      } else if( new Date().getFullYear() !== new Date(value).getFullYear()) {
        return (
          datefns.format(Date.parse(value), 'YY년 M월')
        );
      }
      else {
        return (
          datefns.format(Date.parse(value), 'M월 D일')
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
        .replace(/:\/\/link/g, '(link)');
    },
    nonewline(value: string) {
      //replaceAll prototype 선언
      String.prototype.replaceAll = function (org, dest) {
        return this.split(org).join(dest);
      }
      return value.replaceAll("<br/>", " ")
    }
  }
})
export default class ItemMixin extends Vue {
  itemImageError = [];
  itemErrorImageRoute = '/_nuxt/assets/404.jpg'

  onItemImageError($event: any, key: number) {
    if (!this.itemImageError[key]) {
      this.itemImageError[key] = true
      $event.target.src = require("@/assets/404.jpg");
    }
  }
  onEmptyItem($event) {
    $event!.target!.src = require("@/assets/thumbnail.jpg");
  }

  get emptyItemImage() {
    return require("@/assets/logo2020.png");
  }

  getMediaSourceOfLink(link) {
    console.log('link', link)

    if ( link && link.media && link.media.s3 && link.media.s3.small ) {
      return link.media.s3.small.location
    } else if( typeof link === 'string'){
      return link
    } else {
      return this.itemErrorImageRoute
    }

  }
  thumbImages(item) {
    let imgsrcArr = [];
    if (item && item.attachment && item.attachment[0]) {
      item.attachment.forEach((attachment) => {
        let src = attachment.src; //기본 소스;

        /* s3 데이터로 바꾸는 부분 : 사용중단
        if (attachment.media && attachment.media.s3) {
          let s3 = attachment.media.s3
          if (s3.thumb && s3.thumb.location) {
            src = s3.thumb.location;
          } else if (s3.small && s3.small.location) {
            src = s3.small.location;
          }
        }
        */
        imgsrcArr.push(src);
      });
    } else if (item.links && item.links[0]) {
      const link = item.links[0];
      if (link.media && link.media.s3 && link.media.s3.small) {
        imgsrcArr.push(link.media.s3.small.location);
      } else if (link.media) {
        imgsrcArr.push(link.media.origin);
      }
    }

    return imgsrcArr[0] ? imgsrcArr : null;
  }

  likebtnclick($event) {
    $event.target.style.color = '#FF4545'
  }
}

