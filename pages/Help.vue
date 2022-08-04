<template>
	<v-container style="max-width: 900px; margin: 0 auto;">
		<p style="color:#4c5986">
			문의/건의/버그제보 <br><a href="https://twitter.com/cms_env"><v-icon>mdi-twitter  </v-icon> @cms_env</a> <br> <v-icon>mdi-email</v-icon>   cmsn.service@gmail.com<br>
		</p>
		<h2> 홍보 방법 </h2>
		<p class="mb-2">
			<v-icon size="20" color="orange">mdi-numeric-1-circle</v-icon> 트위터의 자신의 계정에 트윗을 작성
		</p>
		<p>
			<v-icon size="20" color="orange">mdi-numeric-2-circle</v-icon> 1의 트윗 본문 또는 답글 타래에 cmsn 홍보봇 계정 멘션 <br>
		</p>
		<v-alert text color="grey" dense icon="mdi-android" border="left">
			<div>
				홍보봇 계정

			</div>
			<v-row no-gutters="" class="bot" justify="left">
				<div class="pr-3" style="color:#4c5986">그림 @cmsn_RT </div>
				<div class="pr-3" style="color:#0A8f7c">글.. @cmsn_w </div>
				<div class="pr-3" style="color:#f04747">디자인.. @cmsn_d </div>
				<div class="pr-3" style="color:#f6880a">음악.. @cmsn_M </div>
			</v-row>
		</v-alert>
		<p>
			<v-icon color="red">mdi-alert-circle</v-icon>
			홍보봇 계정이
			<strong>
				<nuxt-link class="red--text" to="/bot/art">트위터 한도 초과:리밋<v-icon color="red" size="14">
						mdi-help-circle-outline</v-icon>
				</nuxt-link>
			</strong> 상태라면 홍보 리트윗을 할 수 없습니다.

		</p>



		<h2> 홍보 규칙 </h2>
		<p>
			<v-icon>mdi-alarm</v-icon> <span style="color: #f04747">같은 내용의 재홍보는 <strong>4일에 한 번</strong>, </span><span style="color: #3964b4">
				다른 내용의 홍보는 <strong>1인당</strong> 4일에 <strong>2번</strong>까지만 해 주세요.</span> 유사한 내용은 한 개의 트윗으로 모아서 홍보 요청해주세요. 

			<span class="body-2 grey--text text--darken-1">이 규칙에는 어느 정도의 여유가 있습니다. 예를 들면 실수한 홍보를 지우고 바로 재업로드 홍보를 하셔도 됩니다. 여유를 가지시고 양심적인 이용 부탁드립니다.</span><br> <span
				style="color: #3964b4; font-style: italic;"></span>
		</p>
		<p>
			<span> 커미션을 받는 창작자를 찾는 내용도 홍보 가능합니다.</span>
		</p>
		<p>
			<span> 홍보봇은 요청받은 트윗 타래의 <strong>맨 위 트윗 하나</strong>를 홍보합니다.</span>
		</p>
		<p>
			<span> 같은 트윗을 여러 번 <strong>재홍보</strong> 할 수 있습니다.</span>
		</p>
		<p>
			<span> 자신의 커미션만 홍보 요청해 주세요.</span>
		</p>
		<p>
			<v-icon color="amber">mdi-heart</v-icon> <span>행복한 커미션 되세요.</span>
		</p>
		<h2> 홍보 가능 범위의 예 </h2>
		<p>
			⭕️ 커미션 <span class="red--text">열고</span> 홍보, 이러저러한 느낌의 커미션 찾아요, 커미션 하던 A님 찾아요<br />
			❌ RT이벤트, 공론화, 비즈니스 구인, 외주 등 홍보<br/>
			<span class="body-2 grey--text text--darken-1">잘못된 범위의 홍보는 아래의 홍보 취소 방법에 따라 취소해주세요.</span>
		</p>
		<h2> 홍보 취소 방법 </h2>
		<p>
			<span class="alt"> 자신의 홍보 :</span> <span>취소하고자 하는 트윗의 답글에 홍보봇을 멘션하고 '취소' 라는 키워드를 같이 적습니다. <br>예) @cmsn_RT
				취소</span><br/>
			<span class="body-2 grey--text text--darken-1">트위터 버그로 리트윗 취소가 안 될 때가 있습니다. 리트윗 된 지 오래되지 않은 트윗(대략 봇의 최근 RT 2천개 이내)만 버그 없이 리트윗 취소가 가능합니다.</span>
			<br />
			<span class="body-2 teal--text"></span>
		</p>
		<p>
			<span style="color: #f04747; font-weight: bold">
				<v-icon color="#f04747">mdi-alert-circle</v-icon>
				타인의 홍보(신고) :
			</span> <span>홍보봇 계정에게 쪽지(DM)</span>를 보내 신고합니다.</span><br><span style="color: #f04747">DM 신고는 자동 응답 봇이 받아 누적 신고 수에
				따라 자동 취소하며, 이후 문의 등에 의한 수동 검토를 거칠 수도 있습니다.</span>
		</p>
		<h2> 홍보 제한 </h2>
		<p>
			<v-icon>mdi-cancel</v-icon> <span>타인을 모욕하지 마세요.</span>
		</p>
		<p>
			<v-icon>mdi-copyright</v-icon> <span>저작권을 지켜주세요.</span>
		</p>
		<p>
			<v-icon>mdi-cancel</v-icon> <span>음란물을 유포, 거래하지 마세요. </span><span style="color: #f04747">
				성인물 커미션의 샘플은 외부 링크를 이용하시어 홍보봇 타임라인에 직접 노출되지 않게 해주세요. 또 청소년이 접근 불가하도록 성인인증 장치를 걸어주세요.
			</span>
		</p>
		<p>
			<v-icon>mdi-alert-circle-outline</v-icon> 예술 창작 커미션을 열거나 찾는 내용 이외의 것을 홍보 요청하지 마세요. RT이벤트, 공론화, 상업 광고 등은 홍보 대상이
			아닙니다.
		</p>
		<h2> 웹사이트 이용</h2>


		<p>
			<v-icon>mdi-information</v-icon>
			홍보 목록을 갤러리<v-icon>mdi-view-dashboard</v-icon> 형태로 보고, 목록 내에서 검색<v-icon>mdi-magnify</v-icon>할 수 있습니다. <nuxt-link to="/t"> > 보러가기</nuxt-link>
		</p>

		<p>
			<v-icon>mdi-information</v-icon> <span>열었어요/찾습니다 분류가 자동으로 컨텐츠를 분석하여 이뤄집니다. <br>
				- 분류 오류나 분류 불가로 인해 누락되는 경우가 있어 이용자께서 수정할 수 있도록 개선할 예정입니다.</span>
		</p>



		<h2> Q&A </h2>
		<v-expansion-panels id="qna">
			<v-expansion-panel>
				<v-expansion-panel-header class="pa-3">커미션이 무엇인가요?</v-expansion-panel-header>
				<v-expansion-panel-content>
					<h2>커미션은 예술 작품 창작 의뢰 비용입니다.</h2>
					예술 분야에서 '커미션' 이라는 말이 대중적으로 활성화된 것은 디지털 시대에서 예술을 이전보다 제약 없이 대중적으로 행하고 가까이 대할 수 있게 되고서입니다.<br>

					외주와 다른 점을 말하자면, '외주'라는 단어는 제조 공장에서 쓰기 시작했으며, 중심에 필요한 부품 제작을 외부에 맡기는 것입니다. 부품은 '구매'되어 중심 프로젝트의 일부가 됩니다.<br>

					<h2>커미션은 예술 작품 창작만을 의뢰하는 비용이며, 예술품을 구매하는 비용이 아닙니다.</h2>
					예술 작품에 대한 저작권은 아티스트에게 있습니다.<br>
					저작권자는 저작물을 타인에게 이용 허가하는 등에서 경제적 수익을 올릴 수 있습니다. 저작권자가 원치 않는 범위에서 저작물을 이용할 수 없습니다.
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header class="pa-3">세메센(cmsn)은 무슨 일을 하나요?</v-expansion-panel-header>
				<v-expansion-panel-content>
					세메센은 예술 창작 커미션이나 커미션을 찾는 트윗을 아카이빙하여 게시하는 역할을 하며, 트위터의 봇 계정과 연동됩니다.
					수동으로 리트윗하여 홍보하던 그림 커미션 홍보봇 계정으로 시작하여, 일반 개인이 커미션을 좋아하는 마음에 개발하고 관리합니다.
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header class="pa-3">홍보 요청이 처리되지 않았습니다.</v-expansion-panel-header>
				<v-expansion-panel-content>
					불편을 드려 죄송합니다. 재시도해 주시거나, 문의해주시기 바랍니다.<br><br>

					문제 상황은 다음 중 하나일 수 있습니다.<br>
					- 봇이 트위터 API 한도 초과(리밋) 상태입니다.<br>
					- 컨텐츠 작성 계정과 홍보 요청을 전송한 계정이 다릅니다.<br>
					- 답글로 이어져 확인되는 컨텐츠 중 가장 오래된(가장 위에 있는) 컨텐츠가 커미션 정보가 아닙니다.<br>
					- 봇이 분석하고 수상한 접근으로 판단하여 필터링하였습니다.<br>
					- 귀하의 계정의 서비스 이용이 제한되어 있습니다.<br>
					- 서버 오류입니다. </v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header class="pa-3">서비스에 버그 등 문제가 있습니다.</v-expansion-panel-header>
				<v-expansion-panel-content>
					안내 페이지 상단에 기재된 연락처로 제보 바랍니다. 감사합니다. </v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header class="pa-3">나의 이용 내역을 삭제하고 싶습니다.</v-expansion-panel-header>
				<v-expansion-panel-content>
					이용 내역 삭제를 원하시는 경우, <router-link to="/privacy" style="color: blue; cursor: pointer;">개인정보보호방침</router-link>을
					참고하시고 관리자에게 연락주세요.
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header class="pa-3">광고는 왜 표시되나요?</v-expansion-panel-header>
				<v-expansion-panel-content>
					서비스의 유지에는 비용이 필요하며, 이 비용의 일부는 광고 수익을 통해 얻어집니다. 이용약관에 따라, 광고가 게시될 때에는 반드시, 이용자가 게시한 컨텐츠와 구분 가능한 레이아웃에 서비스 관리자가
					게시합니다.
					일반 이용자는 본인의 커미션 컨텐츠가 아닌 것을 광고할 수 없습니다.<br>
					트위터의 봇 계정은 광고를 리트윗하지 않습니다. 스팸성 광고 등 봇의 목적에 어긋나는 내용이 리트윗되었다면 반드시 어떤 이용자의 무단 행동이므로, 봇과의 쪽지를 통해 신고하실 수 있습니다.
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
		<h2 class="pt-5 pb-0">원하시는 커미션이 있나요?</h2>
		<cat-horiz></cat-horiz>
	</v-container>

</template>

<script>
import CatHoriz from "@/components/cat/Horiz.vue";
export default {
	components: {
		CatHoriz
	},
	mounted() {
		document.documentElement.scrollTop = 0;
	}
};
</script>

<style lang="scss" scoped>
h2 {
	color: #3c4f77;
	padding-top: 14px;
	padding-bottom: 6px;
}

p {
	align-items: center;
	vertical-align: middle;
	font-size: 18px;
	font-family: 'Noto Sans KR', sans-serif;
	font-weight: 400;
}

p strong {
	font-weight: 600;
}

.v-icon {
	font-size: 18px;
	vertical-align: unset;
}

i {}

colortest {
	color: #3964b4;
	font-style: italic;
}

.v-alert a {
	color: rgb(255, 221, 166);
}
</style>
