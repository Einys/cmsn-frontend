<template>
	<div>

		<div class="wrapper">
			<h3 class="pt-5 pb-1">원하시는 커미션이 있나요?</h3>
			<cat-horiz ></cat-horiz>
			<br>
			<ad-banner></ad-banner>
			<h3 class="pt-5 pb-1">세메센 최신 홍보</h3>
			<loader v-if="busy" />
			<masonry :list="list" :isArticle="true" />
			<div v-if="!isEmpty">

				<h3 class="pt-5 pb-1">카테고리 선택하고 더보기</h3>
				<cat-horiz ></cat-horiz>

			</div>

		</div>
	</div>

</template>

<script lang="ts">
import Vue from "vue";
import CatHoriz from "@/components/cat/Horiz.vue";
import Masonry from "@/components/Masonry.vue";
import cmsnService from "@/services/cmsn";
import Loader from "@/components/Loader.vue";
import AdLargeBanner from "@/components/ads/AdLargeBanner.vue";
export default Vue.extend({
  components: {
    CatHoriz,
    Masonry,
    Loader,
    "ad-banner": AdLargeBanner
  },
  data: () => {
    return {
      list: [],
      busy: false,
      artList: [],
      wriList: [],
      desList: [],
      musList: []
    };
  },
  async asyncData({ params }) {
    console.log(
      `[index.vue] asyncData: isClient : ${process.client}, isServer: ${process.server}`
    );
  },
  created() {
    // 환경 변수 출력
    console.log(process.env, 'env')
  },
  mounted() {
    this.petchList();
    googletag.cmd.push(function() {
      googletag.display("banner1");
    });
    //this.petchEach() //나중에 메인에 개별 카테고리가 보이도록 만들기...
  },
  methods: {
    petchList() {
      this.busy = true;
      cmsnService
        .getItemlist({ count: 8 })
        .then(res => {
          //console.log(res.data)
          this.list = res.data.list;
          console.log("petchList");
          this.busy = false;
        })
        .catch(err => {
          console.log(err);
          this.busy = false;
        });
    },
    petchEach() {
      cmsnService.getItemlist({ cat: "art", count: 4 }).then(res => {
        this.artList = res.data.list;
      });
      cmsnService.getItemlist({ cat: "wri", count: 4 }).then(res => {
        this.wriList = res.data.list;
      });
      cmsnService.getItemlist({ cat: "des", count: 4 }).then(res => {
        this.desList = res.data.list;
      });
      cmsnService.getItemlist({ cat: "mus", count: 4 }).then(res => {
        this.musList = res.data.list;
      });
    }
  },
  computed: {
    isEmpty() {
      if (Array.isArray(this.list) && this.list[0]) {
        return false;
      } else {
        return true;
      }
    }
  }
});
</script>
