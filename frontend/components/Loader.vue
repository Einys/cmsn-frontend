<template>
  <div style="padding: 40px 0px;">

    <spinner
      style="margin:0 auto;
        width: 40px;
        height: 40px;
        "
      color="#ffce47"
      class="spinner"
    ></spinner>

  </div>

</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Loader from 'vue-spinner/src/PulseLoader.vue'

@Component({
  components: {
    "spinner": Loader
  }
})
export default class Card extends Vue {

}

</script>

