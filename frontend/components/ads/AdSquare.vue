<template>
    <div class="ad-sq-wrapper">
        <!-- /21750020995/square -->
        <div id='div-gpt-ad-1538840058287-0' >
    </div>


</div>
</template>

<script>
export default {
    mounted(){

        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1538840058287-0'); });

    },
    updated(){
        console.log('Square Ad Updated');


    }
}
</script>

<style>
#div-gpt-ad-1538840058287-0{
    margin: 0 auto;
}
.ad-sq-wrapper{
    width: 336px;
    height: 280px;
    background-image: url("~/404.jpg");
    background-size: cover;
    background-repeat: no-repeat;
}
</style>


