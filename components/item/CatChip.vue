<template>
	<v-dialog v-model="catdialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-row no-gutters v-bind="attrs">
				<span v-for="cat of item.index.cat" :key="cat">
					<v-chip v-on="on"> {{cat | cat}} </v-chip>
				</span>
				<span v-for="intent of item.index.intent" :key="intent" v-bind:class="{ empty: intent === 'und' }">
					<v-chip v-on="on" :color=" intent === 'und' ? 'orange lighten-2' : 'grey lighten-2' ">{{intent | intent}}</v-chip>
				</span>
			</v-row>
		</template>
		<v-card>
			<v-card-title class="pb-0 pt-5">홍보 목적</v-card-title>
			<v-card-text>
				<v-checkbox color="blue lighten-1" :error="needIntent" v-model="item.index.intent" hide-details :label=" 'open' | intent" value="open"></v-checkbox>
				<v-checkbox :error="needIntent" v-model="item.index.intent" hide-details :label=" 'find' | intent" value="find"></v-checkbox>
			</v-card-text>
			<v-card-title class="pb-0 pt-5">분야</v-card-title>
			<v-card-text>
				<v-row no-gutters>
					<v-col cols="12" sm="6">
						<v-checkbox color="amber darken-1" :error="needCat" hide-details v-model="item.index.cat" :label=" 'art' | catadd" value="art"></v-checkbox>
						<v-checkbox color="amber darken-2" :error="needCat" hide-details="auto" v-model="item.index.cat" :label=" 'des' | catadd" value="des"></v-checkbox>
					</v-col>
					<v-col cols="12" sm="6">
						<v-checkbox color="amber darken-3" :error="needCat" hide-details v-model="item.index.cat" :label=" 'wri' | catadd" value="wri"></v-checkbox>
						<v-checkbox color="amber darken-4" :error="needCat" hide-details v-model="item.index.cat" :label=" 'mus' | catadd" value="mus"></v-checkbox>
					</v-col>
				</v-row>
			</v-card-text>
			<v-divider></v-divider>
			<v-alert type="error" v-if="catdialogError">
				{{catdialogError}}
			</v-alert>

			<v-card-actions>

				<v-btn color="primary" text @click="catdialog = false">
					취소
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="catUpdate" :loading="catUpdateProgressRunning" :disabled=" needCat || needIntent ">
					확인
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import ItemMixin from "@/components/mixin/item.ts";

@Component({})
export default class CatChip extends Mixins(ItemMixin) {
  @Prop({ required: true })
  public item: any;

  public catdialog = false;
  catdialogError = "";
  catUpdateProgressRunning = false;
  catUpdate() {
    this.catUpdateProgressRunning = true;
    this.catdialogError = "";
    this.$axios
      .$put("/1.0/data/items/update/index", {
        id: this.item.id,
        cat: this.item.index.cat,
        intent: this.item.index.intent,
      })
      .then((res) => {
        console.log(res);
        this.catdialog = false;
        this.$nuxt.$loading.start();
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        this.catdialogError = err.message;
      })
      .finally(() => {
        this.catUpdateProgressRunning = false;
      });
  }

  get itemIntent(){
    let intent = this.item.index.intent;
    if( Array.isArray(intent) ){
      const idx = intent.indexOf('und')
      intent.splice(idx, 1)
    }
    return intent
  }

  get needCat() {
    return this.item.index.cat.length < 1;
  }
  get needIntent() {
    return ( this.item.index.intent.length < 1 ) || (
      this.item.index.intent.length === 1 && this.item.index.intent[0] === "und"
    );
  }
}
</script>

<style scoped>
span.empty {
  color: red;
}
</style>
