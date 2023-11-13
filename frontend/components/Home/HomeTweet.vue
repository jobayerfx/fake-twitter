<template>
    <v-list-item class="home-tweet" v-ripple="{ class: 'secondaryLightGray--text' }" @click="openTweet(tweet._id)">
        <v-container fluid>
            <v-row>
                <v-list-item-avatar class="mb-auto" size="64">
                    <v-img v-if="tweet.user?.profile_photo" :src="tweet.user.profile_photo"></v-img>
                    <v-icon v-else size="64">
                        mdi-account-circle
                    </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="home-tweet__title">
                        <span class="home-tweet__title-left-side"><span class="font-weight-bold">{{ tweet.user?.name
                        }}</span>
                            <span class="secondaryDarkGray--text">@{{ tweet.user?.username }}</span>
                            <span class="secondaryDarkGray--text">
                                ·
                                {{ timeSince(new Date(tweet.created_at)) }}
                            </span>
                        </span>
                        <HomeTweetMenu :tweet="tweet" :tweetTextUpdate="tweetText" @update-tweet-text="updateTweetText" />
                    </v-list-item-title>
                    <span>
                        {{ tweetText }}
                    </span>
                    <v-card v-if="tweet.image" :img="tweetImage" height="256" class="my-2"></v-card>
                </v-list-item-content>
            </v-row>

            <HomeTweetActions :comments="tweet.commentsQuantity" :likes="tweet.total_likes" :retweets="0" isAvatarMargin
                @like="clickLike" />
        </v-container>
    </v-list-item>
</template>

<script>
export default {
    name: 'LazyHomeTweet',
    props: {
        tweet: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            loaded: false,
            tweetText: '',
            tweetImage: '',
        };
    },
    mounted() {
        this.loaded = true;
        this.tweetText = this.tweet.content;
        this.tweetImage = this.tweet.image
    },
    methods: {
        clickComment() {
            console.log('comment');
        },
        clickRetweet() {
            console.log('retweet');
        },
        clickLike(action) {
            if (action === 'add') {
                this.$emit('like', this.tweet.id, 'add');
            } else {
                this.$emit('like', this.tweet.id, 'remove');
            }
            this.$emit('initialize');
        },
        openTweet(id) {
            this.$emit('open', id);
        },
        updateTweetText(text) {
            this.tweetText = text;
        },
    },

};
</script>

<style scoped>
.home-tweet {
    border-top: 1px solid rgb(243, 243, 243);
}

.home-tweet__avatar-margin {
    margin-left: 80px;
}

.home-tweet__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>