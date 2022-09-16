<template>
	<v-container fluid class="pa-0">
		<v-row class="cat" justify="space-between" no-gutters>

			<v-btn large rounded class="silver--text" :to="{path: '/t/art/'+ (intent || 'open')}">
				<v-icon>mdi-satellite</v-icon>그림
			</v-btn>
			<v-btn large rounded class="gold--text" :to="{path: '/t/wri/'+ (intent || 'open')}">
				<v-icon>mdi-text</v-icon>글, 타로..
			</v-btn>
			<v-btn large rounded class="silver--text" :to="{path: '/t/des/'+ (intent || 'open')}">
				<v-icon >mdi-shape</v-icon>디자인, 공예..
			</v-btn>
			<v-btn large rounded class="gold--text" :to="{path: '/t/mus/'+ (intent || 'open')}">
				<v-icon>mdi-music-note</v-icon>음악, 보이스..
			</v-btn>
			<v-btn v-if="!intent || intent === 'open'" large rounded class="silver--text" :to="{path: '/t/'+(cat || 'all')+'/find'}">
				<v-icon>mdi-human-greeting</v-icon>커미션 찾습니다
			</v-btn>
			<v-btn v-if="intent === 'find'" large rounded class="silver--text" :to="{path: '/t/'+(cat || 'all')+'/open'}">
				<v-icon>mdi-send</v-icon>커미션 열었어요
			</v-btn>
		</v-row>

	</v-container>

</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  //
  props: {
    intent: String,
    cat: String
  }
})
export default class Card extends Vue {

  @Prop({ required: false })
  public intent: any;
  @Prop({ required: false })
  public cat: any;
  mounted() {

  }

}
</script>


<style>
.cat .v-btn{
	box-shadow: 0px 2px 3px 0px rgba(23, 23, 23, 0.1);
	flex: 1 1 auto;
	margin: 2px;
	padding: 0px 10px !important;
	font-size: 16px;
	border-radius: 16px;
}
</style>
