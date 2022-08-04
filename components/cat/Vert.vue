<template>
	<v-container justify-center style="text-align:center; max-width:320px; padding:0; border-radius:4px;">
		<v-col class="mb-4">

			<h2>커미션 열었어요</h2>
			<v-row no-gutters align="center" justify="space-around">
				<v-btn x-large color="blue-grey" text :to="{path:'/t/art/open'}">
					<v-icon left>mdi-satellite</v-icon>그림
				</v-btn>
				<v-btn x-large color="blue-grey darken-2" text :to="{path:'/t/wri/open'}">
					<v-icon left>mdi-text</v-icon> 글..
				</v-btn>

			</v-row>
			<v-row no-gutters align="center" justify="space-around">
				<v-btn x-large color="blue-grey darken-2" text :to="{path:'/t/des/open'}">
					<v-icon left>mdi-shape</v-icon> 디자인..
				</v-btn>
				<v-btn x-large color="blue-grey" text :to="{path:'/t/mus/open'}">
					<v-icon left>mdi-music-note</v-icon> 음악..
				</v-btn>

			</v-row>
		</v-col>

		<v-col>
			<h2>커미션 찾습니다</h2>
			<v-row no-gutters align="center" justify="space-around">
				<v-btn x-large color="blue-grey" text :to="{path:'/t/art/find'}">
					<v-icon left>mdi-satellite</v-icon>그림
				</v-btn>
				<v-btn x-large color="blue-grey darken-2" text :to="{path:'/t/wri/find'}">
					<v-icon left>mdi-text</v-icon> 글..
				</v-btn>

			</v-row>
			<v-row no-gutters align="center" justify="space-around">
				<v-btn x-large color="blue-grey darken-2" text :to="{path:'/t/des/find'}">
					<v-icon left>mdi-shape</v-icon> 디자인..
				</v-btn>
				<v-btn x-large color="blue-grey" text :to="{path:'/t/mus/find'}">
					<v-icon left>mdi-music-note</v-icon> 음악..
				</v-btn>

			</v-row>
		</v-col>
	</v-container>
</template>
