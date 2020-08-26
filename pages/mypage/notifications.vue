<template>
	<div>

		<v-container style="max-width:1200px">
            <v-row>
        <v-col cols="12" md="4">
			<v-card to="items" class="mb-2" color="cyan" dark>
				<v-card-title>
					<v-icon left>mdi-account-circle</v-icon>나의 홍보
				</v-card-title>
			</v-card>
        </v-col>
                <v-col cols="12" md="4">
			<v-card to="following" class="mb-2" color="amber darken-2" dark>
				<v-card-title>
					<v-icon left>mdi-account-multiple</v-icon>팔로잉

				</v-card-title>
			</v-card>
        </v-col>
                <v-col cols="12" md="4">
			<v-card to="likes" class="mb-2" color="pink lighten-1" dark>
				<v-card-title>
					<v-icon left>mdi-heart</v-icon>마음함

				</v-card-title>
			</v-card>
        </v-col>
      </v-row>
			<v-alert border="left" colored-border color="deep-purple accent-4" elevation="2">
				<v-card-text>
					<v-icon left>mdi-compass-rose</v-icon> 세메센에 오신 것을 환영합니다. 나의 커미션을 홍보하거나, 원하는 커미션에 대한 내용을 홍보해 보세요.
				</v-card-text>
			</v-alert>
			<v-sheet height="200" color="transparent" class="grey--text">
				<v-layout fill-height align-center justify-center>
					아직 도착한 세메센 알림이 없습니다.

				</v-layout>
			</v-sheet>




		</v-container>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class NotificationPage extends Vue {}
</script>

<style scoped>
</style>
