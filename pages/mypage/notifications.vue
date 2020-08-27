<template>
	<div>

		<v-container style="max-width:1200px">
            <v-row :no-gutters="$vuetify.breakpoint.smAndDown">
        <v-col cols="12" md="4">
			<v-card to="items" class="mb-2" >
				<v-card-title>
					<v-icon left color="blue-grey">mdi-account-circle</v-icon>나의 홍보
				</v-card-title>
			</v-card>
        </v-col>
                <v-col cols="12" md="4">
			<v-card to="following" class="mb-2">
				<v-card-title>
					<v-icon left color="light-blue lighten-1">mdi-account-multiple</v-icon>팔로잉

				</v-card-title>
			</v-card>
        </v-col>
                <v-col cols="12" md="4">
			<v-card to="likes" class="mb-2">
				<v-card-title>
					<v-icon left color="pink lighten-1">mdi-heart</v-icon>마음함

				</v-card-title>
			</v-card>
        </v-col>
      </v-row>
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
