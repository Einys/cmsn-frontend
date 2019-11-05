<template>
<div class="ad-res">
    <div class="ad-wrapper">
<ins 
     class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-9523902096267561"
     :data-ad-slot="adslot"
     data-ad-format="auto"
     data-full-width-responsive="true">
     </ins>
    </div>
</div>

</template>

<script>
export default {
    props:{
        adstyle:String,
        adslot:String,
    },
    data(){
        return{
            id: Math.floor(Math.random() * 99999999) + 1
        }
    },
    mounted(){
        console.log('Ad ', this.adslot, "Mounted id: " , this.id);
        
            process.nextTick(function(){
                (adsbygoogle = window.adsbygoogle || []).push({});
            })
    },
    watch:{
        '$route'( to, from ){

            console.log("Route change detected. Reload Ad ", this.adslot );
            this.id = Math.floor(Math.random() * 99999999) + 1
            this.$forceUpdate();

            process.nextTick(function(){
                (adsbygoogle = window.adsbygoogle || []).push({});
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
  background-image: url("../../assets/images/ad-bg.svg");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  padding-bottom: 90%;
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
