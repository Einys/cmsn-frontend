<template>
	<v-container fill-height>
		<v-col>

			<v-col  class="mb-5" justify="center" align="center">
				<h2 class="title grey--text text--darken-3 font-weight-bold">
					{{ cat | cat }} 커미션 홍보봇
				</h2>

				<v-progress-circular class="my-5" :size="110" :value="count/3" :color="color">
          <v-col>
					<h1>{{ count }}</h1>
          <p v-if="count >= 280" class="note body-2" >혼잡</p>
          <p v-else-if="count >= 300" class="note body-2">리밋</p>
          <p v-else class="note body-2">원활</p>
          </v-col>

				</v-progress-circular>
				<p class="grey--text text--darken-1" style="display: flex; justify-content: center; align-items: center;">
					280 이상: 혼잡, &nbsp;<strong class="blue-grey--text text--darken-3" >300: 리밋</strong>
				</p>
				<v-row class="caption" justify="center" align="center">
					<v-icon size=16 :color="color">mdi-information</v-icon>&nbsp;<span :class="`${color}--text`">{{computedDate}}</span>&nbsp;기준 지난 3시간 트윗수
				</v-row>
        <v-row class="caption" justify="center">
          <a class="text-decoration-underline grey--text" href="https://help.twitter.com/ko/rules-and-policies/twitter-limits" target="_blank">리밋이 뭔가요?</a>
        </v-row>
			</v-col>

			<v-row style="max-width:800px" class="mx-auto mt-2">
				<v-col cols="12" >
          <v-row justify="center" align="center" class="pb-3" >
					<v-btn rounded @click="$router.push('/bot/art')">그림</v-btn>
					<v-btn rounded @click="$router.push('/bot/wri')">글</v-btn>
					<v-btn rounded @click="$router.push('/bot/des')">디자인</v-btn>
					<v-btn rounded @click="$router.push('/bot/mus')">음악</v-btn>
          </v-row>
				</v-col>
				<v-col cols="12" sm=6>
					<v-card color="amber darken-1" dark @click="$router.push('/t/'+ cat )">
						<v-card-title class="headline">
							<v-icon large left>
								mdi-bookmark
							</v-icon>
							홍보목록
						</v-card-title>
					</v-card>
				</v-col>
				<v-col cols="12" sm=6>
					<a :href="twitterLink" target="_blank">
						<v-card color="#26c6da" dark>
							<v-card-title class="headline font-weight-bold">
								<v-icon large left>
									mdi-twitter
								</v-icon>Twitter
							</v-card-title>
						</v-card>
					</a>
				</v-col>
			</v-row>
		</v-col>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import cmsnService from "@/services/cmsn";
import datefns from "date-fns";
import collection from '@/plugins/collection'

@Component({
  asyncData({ params, error, app }) {
    return cmsnService.getBotLimit(params.cat).then(res => {
      return res.data
    })
      .then(data => {
        console.log(data);
        return { limit: data.limit, count: data.count };
      })
      .catch(err => {
        console.error(err);
        error(err);
      });
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
    }
  },
  head() {
    return {
      title: "세메센 봇 상태 알리미",
      meta: [
        // hid는 유니크한 식별자입니다. `vmid`를 여기에 사용하지 마세요.
        {
          hid: "description",
          name: "description",
          content: "봇의 이용량을 확인할 수 있습니다."
        }
      ]
    };
  }
})
export default class BotStatus extends Vue {
  count: number;
  limit: boolean;

  mounted() {}
  get cat() {
    return this.$route.params.cat;
  }

  get computedDate() {
    return datefns.format(Date.now(), "M월 D일 H시 m분");
  }

  get color() {
    if (!this.count) {
      return "grey";
    } else if (this.count >= 299) {
      return "red";
    } else if (this.count >= 280) {
      return "deep-orange";
    } else if (this.count >= 250) {
      return "orange";
    } else if (this.count > 100) {
      return "green";
    } else if (this.count > 0) {
      return "blue";
    } else {
      return "grey";
    }
  }

  get twitterLink() {
    return 'https://twitter.com/' + collection.bots[this.cat]
  }
}
</script>

<style scoped>
div.sub-title {
  color: rgb(17, 158, 123);
}

div.caption {
  color: rgb(58, 58, 58);
}

morebox > div {
  height: 100%;
}

.note {
  position: absolute; bottom: 18px; left: 0; width: 100%; text-align: center; margin-bottom: 0px;
}

.material-icons { display: inline-flex;
    vertical-align: middle !important; }
</style>
