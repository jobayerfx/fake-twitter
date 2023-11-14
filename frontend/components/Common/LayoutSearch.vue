<template>
    <form>
        <v-text-field v-model="searchText" filled rounded prepend-inner-icon="mdi-magnify" placeholder="Search ..."
            background-color="#e6ecf0" v-on:keydown.enter.prevent="doSearch"></v-text-field>
    </form>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: "LayoutSearch",
    data() {
        return {
            searchText: '',
        };
    },
    methods: {
        doSearch() {
            if (this.searchText)
                this.$router.push(`/search?q=${this.searchText}`);
        }
    }
});
</script>