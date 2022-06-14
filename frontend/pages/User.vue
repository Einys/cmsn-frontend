<template>
    
</template>
<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import cmsnService from "@/services/cmsn";

@Component({
    //
})
export default class Card extends Vue {
  @Prop({required: true})
  id! :string;

    mounted(){

    }
}
</script>


<style>

</style>