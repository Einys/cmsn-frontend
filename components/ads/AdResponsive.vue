<template>
<div class="ad-res">
    <div class="ad-wrapper">
<ins
     class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-9523902096267561"
     :data-ad-slot="slot"
     data-ad-format="auto"
     data-full-width-responsive="true">
     </ins>
    </div>
</div>

</template>

<script>
export default {
    data(){
        return{
            id: Math.floor(Math.random() * 99999999) + 1,
            slot: "9405479595"
        }
    },
    mounted(){
        console.log('Ad ', this.slot, "Mounted id: " , this.id);

            process.nextTick(function(){
                (window.adsbygoogle || []).push({});
            })
    },
    watch:{
        '$route'( to, from ){

            console.log("Route change detected. Reload Ad ", this.slot );
            this.id = Math.floor(Math.random() * 99999999) + 1
            this.$forceUpdate();

            process.nextTick(function(){
                (window.adsbygoogle || []).push({});
            })

        }

    }
}
</script>

<style scoped>
.ad-res{
    display: inline-block;
    margin: 10px 0px;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}

.ad-res .ad-wrapper {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
