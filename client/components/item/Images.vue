<template>
  <div
    class='my-img-grid'
    id='my-img-grid'
  >
    <!--  img.media_url_https = 레거시 데이터 -->
    <template
      v-for="(img, index) in images"
    >

      <img
        :key="index"
        v-if="index <= 3"
        :src="getSrc(img)"
        :class='["len"+ (images.length > 4? 4 : images.length), "index"+index,  (( images.length-index < images.length) && (images.length > 2))? "sub" : "main" ]'
        @error="onImageError($event, index)"
      />

    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  //
  props: {
    images: Array
  }
})
export default class Images extends Vue {
  error = [false];

  mounted() {}
  getSrc(imageObject: any) {
    if (imageObject.src) {
      return imageObject.src;
    } else if (typeof imageObject === "string") {
      return imageObject;
    } else if (imageObject.media_url_https) {
      return imageObject.media_url_https;
    } else if (imageObject.origin) {
      return imageObject.origin;
    } else if (imageObject.location) {
      return imageObject.location;
    } else {
      return "assets/500.jpg";
    }
  }
  essentialImage(src: string) {
    if (src) {
      if (
        src.indexOf("avatar/blog_blank") > -1 ||
        src.indexOf("shared-note-thumbnail.png") > -1 ||
        src.indexOf("facebook_blank_img.jpg") > -1
      ) {
        return null;
      } else {
        return src;
      }
    }
  }
  onImageError($event: any, index: number) {
    if(!this.error[index]){
      this.error[index] = true
      $event.target.src = require("@/assets/404.jpg");
    }
  }
}
</script>


<style>
#my-img-grid {
  width: 100%;
  float: none;
  font-size: 2px;
  text-align: center;
  line-height: 0;
}
img {
  float: none;
  font-family: "object-fit: cover;"; /* IE, Edge, Safari Polyfill */
  object-fit: cover;
  height: 100%;
}

img.len1.index0 {
  width: 100%;
  min-height: 180px;
  max-height: 320px;
}
img.len2.index0 {
  width: 50%;
  height: 180px;
}
img.len2.index1 {
  width: 50%;
  height: 180px;
}
img.len3.index0 {
  width: 100%;
  max-height: 140px;
}
img.len3.index1 {
  width: 50%;
  height: 160px;
}
img.len3.index2 {
  width: 50%;
  height: 160px;
}
img.len4.index0 {
  width: 100%;
  max-height: 200px;
}
img.len4.index1 {
  width: 33%;
  height: 104px;
}
img.len4.index2 {
  width: 33%;
  height: 104px;
}
img.len4.index3 {
  width: 34%;
  height: 104px;
}

@media screen and (max-width: 750px) {
  img.len3.main {
    height: 120px;
  }
  img.len4.main {
    height: 150px;
  }
}
@media screen and (max-width: 540px) {
  img.len3.sub {
    height: 80px;
  }
  img.len4.sub {
    height: 50px;
  }
}
@media screen and (max-width: 480px) {
  #my-img-grid{

  }
  img.len1.index0 {
  min-height: 100px;
}
  img.len3.index0 {
    height: 100px;
  }
  img.len3.index1 {
    height: 80px;
  }
  img.len3.index2 {
    height: 80px;
  }
  img.len4.index0 {
    height: 130px;
  }
  img.len4.index1 {
    height: 50px;
  }
  img.len4.index2 {
    height: 50px;
  }
  img.len4.index3 {
    height: 50px;
  }
}

</style>