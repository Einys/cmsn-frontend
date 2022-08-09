<template>
    <span>
		<v-text-field class="search mt-2" solo flat rounded clearable color="orange" prepend-inner-icon="mdi-magnify"
          :append-icon="keyword !== q ? 'mdi-send' : undefined" style="height:48px; border-radius: 8px;" v-model="keyword" label="검색..."
          v-on:keyup.enter="search()" @click:append="search()" />
    </span>
</template>

<script lang="ts">

export default {
    props: {
        querybase: Object,
        keyword: String
    },
    data: () => {
        return {}
    },
    computed: {
        q() {
            return this.$route.query.q;
        }
    }, 
    methods: {
        search(e: any) {
            console.log("search", this.keyword);
            this.$router.push({ query: { q: this.keyword } });
        }
    }

}
</script>

<style>

</style>