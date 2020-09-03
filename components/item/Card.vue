<template>

	<div>
		<div v-if=" !isAD" @click="toItemPage" style="cursor: pointer">
			<profile :user="item._user" :departedAt="item.departedAt" />
				<div style='position:relative'>
					<div :class="['text', {overlay: hideText, unhideable: unhideableText}]" v-if="item.text" :inner-html.prop="item.text | text"></div>
					<images :images="thumbImages" />
				</div>
		</div>

		<!-- If AD -->
		<div class="ad" v-if="isAD" style="height: auto">
				<ad adstyle="display:block" :adslot="item.slot" isResponsive="true">
				</ad>
		</div>

	</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Images from "./Images.vue";
import Profile from "./Profile.vue";
import Ad from "@/components/ads/Ad.vue";
import MImage from "@/components/methods/image"

@Component({
  name: "item-card",
  components: {
    Images,
    Profile,
    Ad
  },
  filters: {
    text(value: string) {
      return value
        .replace(/<script>/g, " ")
        .replace(/(?:\r\n|\r|\n)/g, "<br/>")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/:\/\/link/g, '<span class="highlight">(link)</span>');
    }
  }
})
export default class Card extends Vue {
  @Prop({ default: false })
  isArticle!: boolean;

  hideText!: boolean;

  unhideableText: boolean = false;

  @Prop({ required: true })
  public item: any;

  created() {
    this.hideText = !this.isArticle;
    // hideText = true 로 초기화 되었더라도, thumbImages 가 없으면 text를 표시하도록 한다.
    if (this.hideText && !this.thumbImages) {
      this.hideText = false;
      this.unhideableText = true; //원래 숨겨져야 하지만 이미지가 없는 바람에 안숨겨진 텍스트(그림, 디자인 게시판의 텍스트) css지정을 위해
      console.log("unhideable text");
    } else {
      //
    }
  }

  toItemPage(){
    if( this.item._user ){
      return window.open('about:blank').location.href = `/i/${this.item.id}`
    } else {
      return window.open('about:blank').location.href = `https://twitter.com/i/web/status/${this.item.id}/`
    }
  }

  get isAD(){
    return this.item && this.item.id === 'ad'
  }

  get computedUsername() {
    if (this.item._user) {
      return this.item._user!.name;
    } else {
      throw new Error("no _user on item");
    }
  }

  get thumbImages() {
    return MImage.thumbImages(this.item)
  }
}
</script>

<style>

.text {
  word-break: break-all;
  position: relative;
  letter-spacing: 0.3px;
  font-size: 1rem;
  padding: 0px 8px 8px 8px;
  line-height: 150%;
  color: #45454e;
}
.text .highlight {
  color: #ff7b7b;
}
.text.overlay {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  top: 0;
  left: 0;
  position: absolute;
  opacity: 0;
  transition: 0.3s;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.9) 70%,
    rgba(255, 255, 255, 0.8) 100%
  );
}
.text.overlay:hover {
  opacity: 1;
}

.ad {
  max-width: 320px;
  text-align: unset !important;
  position: relative;
  overflow: hidden;
  min-height: 120px;
}
.ad body {
  text-align: unset !important;
}
.ad .ad-wrapper {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.ad-wrapper .adsense {
  display: inline;
  vertical-align: middle;
}
.ad-text {
  width: 100%;
  font-size: 12px;
  color: #999999;
  text-align: center;
}


@media screen and (max-width: 550px) {
  .text.unhideable {
    height: 180px;
  }
}
</style>
