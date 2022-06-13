<template>
	<v-container style="max-width: 900px; margin: 0 auto;">
		<h2> 이용안내 </h2>
		<p>
			문의/건의/버그제보 : 트위터 @cms_env, 이메일 cmsn.service@gmail.com<br>
      개인이 개발하고 관리합니다.
		</p>
		<h3> 홍보 방법 </h3>
		<p>
			<v-icon>mdi-check</v-icon><span>홍보 방법</span> <br>1. 트위터의 자신의 계정에 트윗을 작성 <br> 2. 1의 트윗 본문 또는 트윗의 답글 타래에 cmsn 홍보봇 계정 멘션
		</p>
		<v-icon>mdi-android</v-icon> 홍보봇 계정 <br>
		<v-row no-gutters="" class="bot" style="background-color:white" justify="space-around">
			<div style="color:#4c5986">그림 @cmsn_RT </div>
			<div style="color:#008f7c">글+ @cmsn_w </div>
			<div style="color:#f04747">디자인+ @cmsn_d </div>
			<div style="color:#f6880a">음악+ @cmsn_M </div>
		</v-row>
		<br>
		<p>
			<v-icon>mdi-check</v-icon> <span>커미션 아티스트를 찾는 트윗도 홍보 가능합니다.</span>
		</p>
		<p>
			<v-icon>mdi-check</v-icon> <span>홍보봇은 요청받은 트윗타래의 맨 위 트윗 하나를 홍보합니다.</span>
		</p>
		<p>
			<v-icon>mdi-sync</v-icon> <span>같은 트윗을 여러 번 재홍보할 수 있습니다.</span>
		</p>
		<p>
			<v-icon>mdi-alarm</v-icon> <span style="color: #f04747">같은 트윗의 재홍보는 4일에 한 번, </span><span style="color: #3964b4"> 다른 트윗의 홍보는 4일에 2번까지만 해 주세요. 홍보 실수로 지우고 재업해서 홍보하는 등의 사유를 포함하여 4일에 2번입니다.</span>
			<span>유사한 내용은 반드시 한 트윗으로 모아서 홍보 요청해주세요.</span><br> <span style="color: #3964b4; font-style: italic;"> (2021.04 에 추가된 내용) </span>
		</p>
		<p>
			<v-icon>mdi-check-circle-outline</v-icon> <span>자신의 커미션만 홍보 요청해 주세요.</span>
		</p>
		<p>
			<v-icon>mdi-heart</v-icon> <span>행복한 커미션 되세요.</span>
		</p>
		<h3> 홍보 취소 방법 </h3>
		<p>
			<v-icon>mdi-undo</v-icon> <span class="alt">자신의 홍보 :</span> <span>&nbsp;&nbsp;취소하고자 하는 트윗의 답글에 홍보봇을 멘션하고 '취소' 라는 키워드를 같이 적습니다. <br>예) @cmsn_RT 취소</span>
		</p>
		<p>
			<span style="color: #f04747; font-weight: bold">
				<v-icon color="#f04747">mdi-alert-circle</v-icon> 타인의 홍보(신고) :
			</span> <span>&nbsp;&nbsp;홍보봇 계정에게 쪽지(DM)</span>
			<v-icon fontSet="material-icons-outlined">mdi-email-outline</v-icon><span>를 보내 신고합니다.</span><br><span style="color: #f04747">신고는 자동 응답 봇이 받아 누적 신고 수에 따라 자동 취소하며, 이후 문의 등에 의한 수동 검토를 거칠 수 있습니다.</span>
		</p>
		<h3> 웹사이트 </h3>
		<p>
			<v-icon>mdi-information</v-icon> <span>홍보 목록을 갤러리<v-icon>mdi-view-dashboard</v-icon> 형태로 보고, 목록 내에서 검색<v-icon>mdi-magnify</v-icon>할 수 있습니다.</span>
		</p>
		<p>
			<v-icon>mdi-information</v-icon> <span>열었어요/찾습니다 분류가 자동으로 컨텐츠를 분석하여 이뤄집니다. <br>분류 오류나 분류 불가로 인해 누락되는 경우가 있어 이용자께서 수정할 수 있도록 개선할
				예정입니다.</span>
		</p>
		<h3> 금지 </h3>
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
			<v-icon>mdi-alert-circle-outline</v-icon> <span>서비스의 목적(예술 커미션 홍보)과 이용환경을 해치지 마세요.</span>
		</p>

		<h3> Q&A </h3>
		<v-expansion-panels id="qna">
			<v-expansion-panel>
				<v-expansion-panel-header class="pa-3">커미션이 무엇인가요?</v-expansion-panel-header>
				<v-expansion-panel-content>
					<h3>커미션은 예술 작품 창작 의뢰 비용입니다.</h3>
					예술 분야에서 '커미션' 이라는 말이 대중적으로 활성화된 것은 디지털 시대에서 예술을 이전보다 제약 없이 대중적으로 행하고 가까이 대할 수 있게 되고서입니다.<br>

					외주와 다른 점을 말하자면, '외주'라는 단어는 제조 공장에서 쓰기 시작했으며, 중심에 필요한 부품 제작을 외부에 맡기는 것입니다. 부품은 '구매'되어 중심 프로젝트의 일부가 됩니다.<br>

					<h3>커미션은 예술 작품 창작만을 의뢰하는 비용이며, 예술품을 구매하는 비용이 아닙니다.</h3>
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
					이용 내역 삭제를 원하시는 경우, <router-link to="/privacy" style="color: blue; cursor: pointer;">개인정보보호방침</router-link>을 참고하시고 관리자에게 연락주세요.
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header class="pa-3">광고는 왜 표시되나요?</v-expansion-panel-header>
				<v-expansion-panel-content>
					서비스의 유지에는 비용이 필요하며, 이 비용의 일부는 광고 수익을 통해 얻어집니다. 이용약관에 따라, 광고가 게시될 때에는 반드시, 이용자가 게시한 컨텐츠와 구분 가능한 레이아웃에 서비스 관리자가 게시합니다.
					일반 이용자는 본인의 커미션 컨텐츠가 아닌 것을 광고할 수 없습니다.<br>
					트위터의 봇 계정은 광고를 리트윗하지 않습니다. 스팸성 광고 등 봇의 목적에 어긋나는 내용이 리트윗되었다면 반드시 어떤 이용자의 무단 행동이므로, 봇과의 쪽지를 통해 신고하실 수 있습니다.
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
		<h3 class="pt-5 pb-0">원하시는 커미션이 있나요?</h3>
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

<style lang="scss">
.v-icon {
  margin-right: 3px;
}

colortest{
  color: #3964b4;
  font-style: italic;
}

</style>
