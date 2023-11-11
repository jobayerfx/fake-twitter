<template>
    <div class="home mx-auto">
        <div v-if="!loaded">
            <v-skeleton-loader boilerplate type="list-item-avatar"></v-skeleton-loader>
            <v-skeleton-loader boilerplate type="actions"></v-skeleton-loader>

            <div class="big-divider"></div>

            <BaseVProgressCircular />
        </div>

        <div v-if="loaded">
            <HomeTweetAdd />

            <div class="big-divider"></div>

            <v-list flat>
                <v-list-item-group>
                    <LazyHomeTweet v-for="tweet in tweets" :key="tweet._id" :tweet="tweet" @like="trySwitchLike"
                        @open="openTweet" />
                </v-list-item-group>
            </v-list>
        </div>

        <BaseVSnackbar :is-visible="snackbarError" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BaseVProgressCircular from '../components/Base/BaseVProgressCircular.vue';
import LazyHomeTweet from '../components/Home/HomeTweet.vue';
import BaseVSnackbar from '../components/Base/BaseVSnackbar.vue';
export default {
    components: { BaseVProgressCircular, LazyHomeTweet, BaseVSnackbar },
    layout: 'empty',
    data() {
        return {
            loaded: false,
            snackbarError: false,
            tweets: [],
        };
    },
    async fetch() {
        await this.fetchAllTweets();
        const tweets = this.storeTweets.tweets;
        this.tweets = tweets;
    },

    computed: {
        ...mapState({
            storeTweets: 'tweets',
        }),
    },

    watch: {
        'storeTweets.tweets'() {
            this.tweets = this.storeTweets.tweets;
        },
    },
    mounted() {
        this.loaded = true;
    },
    methods: {
        ...mapActions({
            switchLikeOnServer: 'tweets/switchLike',
            fetchAllTweets: 'tweets/fetchTweets',
            fetchStoreTweetDetailsById: 'tweets/fetchStoreTweetDetailsById',
        }),

        async trySwitchLike(id, action) {
            try {
                const data = {
                    id,
                    action,
                };
                await this.switchLikeOnServer(data);
            } catch (err) {
                this.snackbarError = true;
                console.error(err);
            }
        },
        async openTweet(id) {
            try {
                await this.fetchStoreTweetDetailsById(id);
                this.$router.push('/tweet/' + id);
            } catch (err) {
                this.snackbarError = true;
                console.error(err);
            }
        },
    },

}
</script>

<style scoped>
.home {
    max-width: 800px;
}

.big-divider {
    height: 8px;
    background: #e1e8ed;
    border-radius: 4px;
}
</style>