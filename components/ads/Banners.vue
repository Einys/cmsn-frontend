<template>
	<div>
		<ad-xs-banner v-if="$vuetify.breakpoint.smAndDown" />
		<!-- <ad-xs-320x100 v-if="$vuetify.breakpoint.smAndDown" /> -->
		<ad-lg-banner v-else />
	</div>

</template>

<script>
import AdMobileBanner from "@/components/ads/AdMobileBanner.vue";
import AdMobileBanner2 from "@/components/ads/AdMobileBanner2.vue";
import AdLargeBanner from "@/components/ads/AdLargeBanner.vue";
export default {
  components: {
    "ad-xs-banner": AdMobileBanner,
    "ad-xs-320x100": AdMobileBanner2,
    "ad-lg-banner": AdLargeBanner,
  },

};
</script>

<style>
</style>
