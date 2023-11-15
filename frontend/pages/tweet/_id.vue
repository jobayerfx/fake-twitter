<template>
    <div class="tweet-details">
        <div v-if="!loaded">
            <v-skeleton-loader boilerplate type="list-item-avatar"></v-skeleton-loader>
            <div class="text-center mt-8">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
        </div>

        <div v-if="loaded" class="loaded">
            <v-list-item class="pl-0" @click="$router.push(/profile/ + tweet.user.username)">
                <v-list-item-avatar size="48">
                    <v-img :src="tweet.user.profile_photo" alt="Аватар"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">
                        {{ tweet.user?.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        @{{ tweet.user?.username }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <div class="tweet-details__text">
                {{ tweet.content }}
            </div>
            <v-card v-if="tweet.image" :img="tweetImage" height="256" class="my-2"></v-card>
            <v-list-item class="pl-0">
                <v-list-item-content class="pt-2">
                    <v-list-item-subtitle>
                        {{ timeSince(new Date(tweet.created_at)) }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-container fluid>
                <HomeTweetActions :comments="0" :likes="tweet.total_likes" :retweets="0" @like="switchLike" />
            </v-container>
        </div>
        <BaseVSnackbar :is-visible="snackbarError" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
    middleware: ['isAuth'],
    data() {
        return {
            loaded: false,
            snackbarError: false,
            tweet: {},
            tweetImage: '',
        };
    },
    fetch() {
        const tweet = this.$store.state.tweets.tweetDetails;
        this.tweet = tweet;
    },
    computed: {
        tweetId() {
            return this.$route.params.id;
        },
    },
    mounted() {
        this.loaded = true;
        this.tweetImage = this.tweet.image
    },
    methods: {
        ...mapActions({
            switchLikeOnServer: 'tweets/switchLike',
        }),
        async switchLike(action) {
            try {
                const data = {
                    id: this.tweetId,
                    action,
                };
                await this.switchLikeOnServer(data);
            } catch (err) {
                this.snackbarError = true;
                console.error(err);
            }
        },
    },

});
</script>

<style scoped>
.tweet-details__text {
    font-size: 18px;
}
</style>