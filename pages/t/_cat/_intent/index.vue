<template>
	<div>
    <!-- ad banner large -->
    <ad-lg-banner v-if=" ! this.$vuetify.breakpoint.smAndDown "></ad-lg-banner>
		<!-- ad banner -->
		<Adsense v-if=" this.$vuetify.breakpoint.smAndDown "
        data-ad-client="ca-pub-9523902096267561"
        data-ad-slot="4952472534">
    </Adsense>
    <!-- <Adfit></Adfit> -->
		<div class="wrapper">
			<!-- <v-btn fab small depressed dark color="orange" style="z-index:50; position: fixed; bottom: 10px; right: 10px; opacity: 0.7;" @click="scrollToTop()">
				<v-icon>mdi-chevron-up</v-icon>
			</v-btn> -->
			<v-layout no-gutters row wrap justify-center align-center class="mb-2">

				<v-flex>
					<v-row no-gutters align="center" justify="start" v-if="cat!=='all'">
            <h2 class="font-weight-bold headline" style="vertical-align:middle; cursor:pointer;" @click="toFirst()">{{cat|cat}} 커미션 {{intent | intent}}&nbsp;</h2>
            <div style="font-size:1px; display:inline-flex" class="mr-2">
              <v-btn x-small text fab depressed class="blue--text text--lighten-1" @click="$router.push('/bot/'+cat )" style="margin-left: -6px;">
                <v-icon>mdi-poll</v-icon>
              </v-btn>
              <v-btn v-if="cat" :href="'https://twitter.com/'+ (bots ||[])[cat]" target="_blank" text x-small fab color="light-blue lighten-1" style="margin-left: -4px;">
                <v-icon size="22">mdi-twitter</v-icon>
              </v-btn>
            </div>
            <v-text-field class="search my-2" solo flat rounded clearable color="orange" prepend-inner-icon="mdi-magnify"
            :append-icon="keyword !== q ? 'mdi-send' : undefined" style="max-width:360px; border-radius: 16px;" v-model="keyword" label="검색..."
            v-on:keyup.enter="search()" @click:append="search()" />

					</v-row>
					<div class="body grey--text text--darken-2">
						{{(content||[])[cat]}}
					</div>
				</v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md3>
          <page-button :pageNum="page" :hasPrevious=" page > 1 " :hasNext="next && next[0]" />
        </v-flex>
        <v-flex xs12 class="mt-5 mb-2" v-if="q">
          <h2>
            검색 : {{q}}
          </h2>
        </v-flex>
			</v-layout>

			<div class="masonry-wrapper">
				<loader v-if="busy" />
				<masonry class="mt-1" v-if="!isEmpty" :list="list" :isArticle="!gallery" />
				<page-button class="mt-4" style="padding-bottom:36px" v-if="!isEmpty && !busy" :pageNum="page" :hasPrevious=" page > 1 " :hasNext="next && next[0]" />
          <v-layout v-if="isEmpty && !busy" justify-center> <h2>표시할 내용이 없습니다.</h2> </v-layout>
			</div>

		</div>

	</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import cmsnService from "@/services/cmsn";
import CatHoriz from "@/components/cat/Horiz.vue";
import Masonry from "@/components/Masonry.vue";
import PageButton from "@/components/PageButton.vue";
import Loader from "@/components/Loader.vue";
import AdMobileBanner from "@/components/ads/AdMobileBanner.vue";
import AdMobileBanner2 from "@/components/ads/AdMobileBanner2.vue";
import AdLargeBanner from "@/components/ads/AdLargeBanner.vue";
import Adfit from "@/components/ads/Adfit.vue";

import { isArray } from "util";

@Component({
  //
  components: {
    Masonry,
    PageButton,
    "ad-xs-banner": AdMobileBanner,
    "ad-320x100": AdMobileBanner2,
    "ad-lg-banner": AdLargeBanner,
    Loader,
    CatHoriz,
    Adfit
  },
  data(){
    return {
      keyword: ''
    }
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

  count = 30;

  busy = false;
  gallery: boolean;
  keyword: string;

  bots = {
    art: "cmsn_RT",
    des: "cmsn_d",
    wri: "cmsn_w",
    mus: "cmsn_m"
  };

  created() {
    this.gallery = typeof this.q === "string" || this.isImages;
    this.keyword = isArray(this.q) ? this.q[0] : this.q;
  }
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
          cat: this.cat === "all" ? undefined : this.cat,
          intent: this.intent,
          count: this.count,
          skip: this.skip,
          //@ts-ignore
          keyword: this.q
        }) 
      .then(res => {
        return res.data
      }).
      then(({ list, next }) => {

        let listInclAd = this.pushAdd(list);
        this.list = listInclAd;

        this.next = next;
        this.busy = false;

      })
      .catch(err => {
        console.log(err);
        this.busy = false;
      });
  }

  pushAdd(itemlist: any[]) {
    let adindex;
    let slot;
    let upperSlot = "4952472534";
    let mobildReslot = "2851911042";
    let underSlot = "6263283269";

    if (window.innerWidth < 1400) {
      adindex = 2;
    } else {
      adindex = 3;
    }
/* //광고
    if (itemlist.length > 0) {
      itemlist.splice(adindex, 0, {
        id: "ad",
        clientNum: "ca-pub-9523902096267561",
        slot: upperSlot
      });
    }

    if (itemlist.length > 10) {
      itemlist.splice(itemlist.length - 4, 0, {
        id: "ad",
        clientNum: "ca-pub-9523902096267561",
        slot: underSlot
      });
    }
    */
    return itemlist
  }

  search(e: any) {
    console.log("search", this.keyword);
    this.$router.push({ query: { q: this.keyword } });
  }

  scrollToTop() {
    document.documentElement.scrollTop = 0;
  }
  toggleGallery() {
    console.log("toggle gallery");
    this.gallery = false;
  }
  toFirst() {
    this.$router.push({ query: { ...this.$route.query, page: "1" } })
  }
  get cat() {
    return this.$route.params.cat;
  }
  get intent() {
    return this.$route.params.intent;
  }
  get page() {
    let pageQuery = this.$route.query.page;
    if (typeof pageQuery === "string") {
      return pageQuery;
    } else if (Array.isArray(pageQuery)) {
      return pageQuery[0];
    } else {
      return "1";
    }
  }
  get skip() {
    let skip = (parseInt(this.page) - 1) * this.count;
    return skip > 0 ? skip : 0;
  }

  get q() {
    return this.$route.query.q;
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
  padding: 0px 6px 0px 10px !important;
}
.search .v-text-field__details {
  display: none;
}

.v-text-field.v-text-field--solo .v-input__control  {
  min-height: unset !important;
}
.v-input__slot {
  margin-bottom: 0px !important;
  height: 36px;
}
</style>
