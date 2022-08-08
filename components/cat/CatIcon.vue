<template>
    <nuxt-link :to="path" :class="color+'--text'">
        <v-col justify="center" align="center">
            <v-row justify="center" align="center">
                <v-icon size="28" :color="color">{{icon}}</v-icon>
            </v-row>
            <v-row class="pt-1 body-2" justify="center" align="center">{{text}}</v-row>
        </v-col>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        path: String,
        icon: String,
        text: String,
        color: { type: String, default: "silver"}
    }
}
</script>

<style scoped>
a {
	color: rgb(50, 59, 67) !important;
    min-width: 50px;
}
.cat .v-btn{
	box-shadow: 0px 1px 4px 0px rgba(23, 23, 23, 0.06);
	flex: 1 1 auto;
	margin: 2px;
	padding: 0px 10px !important;
	margin: 0.5px;
	font-size: 16px;
	border-radius: 8px;
}

</style>