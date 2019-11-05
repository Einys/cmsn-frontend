<template>
	<div>
		<!-- ad banner -->
		<ad-320x100 v-if="$vuetify.breakpoint.smAndDown"></ad-320x100>
    <ad-lg-banner v-else></ad-lg-banner>

		<div class="wrapper">
      <v-btn fab depressed dark color="orange" style="z-index:5; position: fixed; bottom: 10px; right: 10px; opacity: 0.7;"
      @click="scrollToTop()">
        <v-icon>mdi-chevron-up</v-icon></v-btn>

			<v-layout no-gutters row wrap justify-center align-center class="ma-2">

				<v-flex xs12 sm8>
					<v-row no-gutters align="center">
						<h2 class="headline">{{cat|cat}} 커미션 {{intent | intent}}&nbsp;</h2>
						<v-btn v-if="cat" class="pa-1" :href="'https://twitter.com/'+bots[cat]" target="_blank" text color="light-blue">
							<v-icon left>mdi-twitter</v-icon>{{bots[cat]}}
						</v-btn>

					</v-row>
					<div class="body">
						{{content[cat]}}
					</div>
				</v-flex>
				<v-flex xs12 sm4>
					<v-text-field class="search mt-2" solo flat color="orange" prepend-inner-icon="mdi-magnify" style="height:48px;" v-model="keyword" label="검색..." v-on:keyup.enter="search()" />
				</v-flex>
        <v-flex xs12 v-if="cat === 'all'">
          <cat-horiz :cat="cat" :intent="intent"></cat-horiz>
        </v-flex>
			</v-layout>
			<div class="masonry-wrapper">
				<page-button :pageNum="page" :hasPrevious=" page > 1 " :hasNext="next && next[0]" />
				<loader v-if="busy" />
				<masonry v-if="list" :list="list" :isArticle="!isImages" />

				<page-button v-if="!isEmpty && !busy" :pageNum="page" :hasPrevious=" page > 1 " :hasNext="next && next[0]" />
			</div>

		</div>
    
		<!-- ad banner -->
		<ad-xs-banner v-if="$vuetify.breakpoint.smAndDown"></ad-xs-banner>
    <ad-lg-banner v-else></ad-lg-banner>
    
	</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import cmsnService from "@/services/cmsn";
import CatHoriz from "@/components/cat/Horiz.vue";
import Masonry from "@/components/Masonry.vue";
import PageButton from "@/components/PageButton.vue";
import Loader from "@/components/Loader.vue";
import Banners from "@/components/ads/Banners.vue";
import AdMobileBanner from "@/components/ads/AdMobileBanner.vue";
import AdMobileBanner2 from "@/components/ads/AdMobileBanner2.vue";
import AdLargeBanner from "@/components/ads/AdLargeBanner.vue";
@Component({
  //
  components: {
    Masonry,
    PageButton,
    "ad-banner": Banners,
    "ad-xs-banner": AdMobileBanner,
    "ad-320x100": AdMobileBanner2,
    "ad-lg-banner": AdLargeBanner,
    Loader,
    CatHoriz
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
    }
  }
})
export default class Card extends Vue {
  @Prop()
  public cat!: string;

  @Prop()
  public intent!: "open" | "find";

  @Prop({ default: "1" })
  public page!: string;

  @Prop()
  public q!: string;

  keyword = this.q || null;

  @Watch("page")
  private onPageChanged(newPage: string, page: string) {
    console.log("page changed ", page, newPage);
    this.fetchData();
  }

  @Watch("$route.query")
  private onQueryChanged(newPage: string, page: string) {
    console.log("query changed ", page, newPage);
    this.fetchData();
  }

  content = {
    art: "",
    wri: "문예, 문예번역, 캐릭터봇, 점술 커미션",
    des: "시각디자인, 캘리그라피, 영상그래픽, 수공예, 사진촬영, 코스프레",
    mus: "보이스, 작곡, 믹싱 커미션"
  };

  next = null;
  list: any[] = [];

  count = 24;

  busy = false;

  bots = {
    art: "cmsn_RT",
    des: "cmsn_d",
    wri: "cmsn_w",
    mus: "cmsn_m"
  };

  created() {}
  mounted() {
    this.fetchData();
  }

  fetchData() {
    this.list = [];
    this.next = null;
    this.busy = true;

    document.documentElement.scrollTop = 0;
    console.log("scroll to top ");

    cmsnService
      .getItemlist({
        cat: this.cat,
        intent: this.intent,
        count: this.count,
        skip: this.skip,
        keyword: this.q
      })
      .then(({ data }) => {
        this.list = data.list;
        this.next = data.next;
        this.busy = false;
      })
      .catch(err => {
        console.log(err);
        this.busy = false;
      });
  }

  search(e: any) {
    console.log("search", this.keyword);
    this.$router.push({ query: { q: this.keyword } });
  }

  scrollToTop(){
    document.documentElement.scrollTop = 0;
  }

  get skip() {
    let skip = (parseInt(this.page) - 1) * this.count;
    return skip > 0 ? skip : 0;
  }

  get isEmpty() {
    return !(Array.isArray(this.list) ? this.list[0] : true);
  }

  get isImages() {
    return this.intent === "open" && (this.cat === "art" || this.cat === "des");
  }
}
</script>


<style>
.search .v-input__slot {
  background-color: #ffffff !important;
}
.search .v-text-field__details {
  display: none;
}
</style>