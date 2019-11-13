<template>
<div>

<ins class="adsbygoogle"
     :style="adstyle"
     data-ad-client="ca-pub-9523902096267561"
     :data-ad-slot="adslot"
     data-ad-format="rectangle"
     :data-full-width-responsive="isResponsive">
     </ins>

</div>

</template>

<script>
export default {
    props:{
        adstyle:String,
        adslot:String,
        isResponsive:String // T/F
    },
    mounted(){
        console.log('Ad ', this.adslot, "Mounted");
        (window.adsbygoogle || []).push({});
    }
}
</script>

<style>

</style>
