<template>

  <!-- /21750020995/lg-banner -->
  <div id='div-gpt-ad-1673492649944-0' style="margin:0 auto; text-align:center">

  </div>

</template>

<script>

export default {
  props: {},
  created() {
    console.log('Large Banner Ad Created');
  },
  mounted() {
    console.log('Large Banner Ad Mounted');
    googletag.cmd.push(function() {
      googletag.display("div-gpt-ad-1673492649944-0");
      console.log('Large Banner googletag pushed');
    });
  },
  updated() {
    console.log("Large Banner Ad Updated");
  }
};
</script>

<style>
#div-gpt-ad-1538279860075-0 {
  margin: 0 auto;
}
</style>

