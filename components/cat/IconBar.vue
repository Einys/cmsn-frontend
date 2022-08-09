<template>
	<v-container fluid class="pa-0">
		<v-row class="cat pb-3" justify="space-between" no-gutters>
			<div class="media-scroller">
				<v-slide-item style="margin-left:-11px">
					<cat-button :path="'/t/art/'+ (intent || 'open')" icon="mdi-satellite" text="그림" color="silver">
					</cat-button>
				</v-slide-item>
				<v-slide-item>
					<cat-button :path="'/t/wri/'+ (intent || 'open')" icon="mdi-text" text="글, 타로" color="gold">
					</cat-button>
				</v-slide-item>
				<v-slide-item>
					<cat-button :path="'/t/des/'+ (intent || 'open')" icon="mdi-shape" text="디자인, 공예"></cat-button>
				</v-slide-item>
				<v-slide-item>
					<cat-button :path="'/t/mus/'+ (intent || 'open')" icon="mdi-music-note" text="음악, 보이스"
						color="gold"></cat-button>
				</v-slide-item>
				<v-slide-item>
					<cat-button icon="mdi-human-greeting" path="/t/all/find" text="찾습니다"></cat-button>
				</v-slide-item>
			</div>

		</v-row>

	</v-container>

</template>
<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";
	import CatBar from "~/components/cat/IconBtn.vue"

	@Component({
		//
		props: {
			intent: String,
			cat: String
		},
		components: {
			catButton: CatBar
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


<style scoped>
	a {
		color: rgb(50, 59, 67) !important;
	}

	.cat .v-btn {
		box-shadow: 0px 1px 4px 0px rgba(23, 23, 23, 0.06);
		flex: 1 1 auto;
		margin: 2px;
		padding: 0px 10px !important;
		margin: 0.5px;
		font-size: 16px;
		border-radius: 8px;
	}

	.media-scroller {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: max-content;
		gap: 16px;
		overflow-x: auto;
		overscroll-behavior-inline: contain;
	}

	.media-scroller {
		-ms-overflow-style: none;  /* Internet Explorer 10+ */
		scrollbar-width: none;  /* Firefox */
	}
	.media-scroller::-webkit-scrollbar { 
		display: none;  /* Safari and Chrome */
	}

	.media-element {
		display: grid;
		gap: var(--size-2);
	}
</style>