<template>
    <v-container class="profile">
        <div v-if="!isLoaded">
            <BaseVProgressCircular />
        </div>
        <div v-if="isLoaded && accountInfo">
            <v-row class="pb-16">
                <v-card>
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" class="woo"
                        style="overflow: visible">
                        <v-avatar class="pa-1 avatar-style" size="120" color="white">
                            <img v-if="accountInfo.profile_photo" width="80" height="80" :src="accountInfo.profile_photo"
                                alt="avatar">
                            <v-icon v-else size="120">
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-img>
                </v-card>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <div class="text-h5 font-weight-bold">
                        {{ accountInfo?.name }}
                    </div>
                    <div class="subtitle-1 secondaryDarkGray--text">
                        @{{ accountInfo?.username }}
                    </div>
                </v-col>
                <v-col cols="4">
                    <ProfileChangeDialog v-if="$auth.user.username === profileUsername" class="ml-auto"
                        :user-data="accountInfo" @update-user="tryUpdateUser" />
                    <div v-else>
                        <v-btn v-if="isFollowed()" rounded @click="follow"
                            class="secondaryDarkGray white-text text-capitalize">Follow</v-btn>
                        <v-btn v-else rounded @click="unfollow" class="text-capitalize">Unfollow</v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row v-if="accountInfo.bio" class="mb-8">
                <div>
                    <span> {{ accountInfo.bio }} </span>
                </div>
            </v-row>
            <v-row>
                <v-col class="pt-0">
                    <div class="subtitle-1 secondaryDarkGray--text">
                        <span class="ml-2">
                            <v-icon>mdi-map-marker-outline</v-icon>
                            {{ accountInfo.location ?? 'Dhaka, Bangladesh' }}
                        </span>
                        <span class="ml-2">
                            <v-icon>mdi-alpha-b-circle-outline</v-icon>
                            Born {{ accountInfo.dob ? formatDate(accountInfo.dob) : 'January 1, 1990' }}
                        </span>
                        <span>
                            <v-icon>mdi-calendar</v-icon>
                            Joined
                            {{ formatDate(accountInfo.created_at) }}
                        </span>

                        <span v-if="!isEmptyWebsite" class="ml-2">
                            <v-icon>mdi-web</v-icon>
                            <a :href="accountInfo.website" target="_blank">
                                {{ accountInfo.website }}
                            </a>
                        </span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="pt-0">
                    <div class="subtitle-1">
                        <span class="ml-4">
                            <NuxtLink :to="`/following/${accountInfo.username}`" class="following-style"><strong>{{
                                following.length }}</strong>
                                Following</NuxtLink>
                        </span>
                        <span class="ml-2 following-style">
                            <NuxtLink :to="`/following/${accountInfo.username}`" class="following-style"><strong>{{
                                follower.length }}</strong>
                                Follower</NuxtLink>
                        </span>
                    </div>

                </v-col>
            </v-row>


            <v-tabs v-model="selectedTab" background-color="transparent" color="primary" grow>
                <v-tab class="text-capitalize">
                    My Tweets
                </v-tab>
                <v-tab v-for="tab in tabs" :key="tab" class="text-capitalize">
                    {{ tab }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="selectedTab">
                <v-tab-item>
                    <v-card flat>
                        <v-list v-if="userTweets.length" flat>
                            <v-list-item-group>
                                <div v-for="tweet in userTweets" :key="tweet.id">
                                    <LazyHomeTweet :tweet="tweet" @like="trySwitchLike" @open="openTweet"
                                        @initialize="initialize" />
                                </div>
                            </v-list-item-group>
                        </v-list>
                        <v-card-text v-else class="text-capitalize font-weight-bold">No tweets found!</v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item v-for="tab in tabs" :key="tab">
                    <v-card flat>
                        <v-card-text class="text-capitalize">{{ tab }}</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </div>
        <BaseVSnackbar :is-visible="snackbarError" />
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { FollowApi } from '@/service'
// eslint-disable-next-line max-len
import ProfileChangeDialog from '../../components/Profile/ProfileChangeDialog.vue';
import BaseVProgressCircular from '../../components/Base/BaseVProgressCircular.vue';
import LazyHomeTweet from '../../components/Home/HomeTweet.vue';
export default {
    components: { ProfileChangeDialog, BaseVProgressCircular, LazyHomeTweet },
    middleware: ['isAuth'],
    data() {
        return {
            accountInfo: {},
            follower: [],
            following: [],
            tabs: ['Replies', 'Media', 'Likes'],
            selectedTab: null,
            snackbarError: false,
            isLoaded: false,
            // profileUsername: null
        };
    },

    computed: {
        ...mapGetters({
            accountStore: 'account/currentUser',
            meFollower: 'account/followerUser',
            meFollowing: 'account/followingUser',
            userTweets: 'tweets/userTweets',
        }),
        isEmptyWebsite() {
            return this.accountInfo.website === '';
        },
        isEmptyAbout() {
            return this.accountInfo.bio === '';
        },
        profileUsername() {
            return this.$route.params.username;
        }
    },
    watch: {
        accountStore: {
            handler(nv, ov) {
                if (this.accountStore.length === 0) {
                    this.initialize()
                } else {
                    this.fetch();
                }
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        this.isLoaded = true;
        this.initialize()
    },
    methods: {
        ...mapActions({
            getMe: 'account/getme',
            getProfile: 'account/getProfileByUsername',
            updateUser: 'account/updateUser',
            getFollower: 'account/getFollower',
            getFollowing: 'account/getFollowing',
            doFollow: 'account/doFollow',
            doUnfollow: 'account/doUnfollow',
            fetchUserTweets: 'tweets/fetchTweetsByUsername',
            switchLikeOnServer: 'tweets/switchLike',
            fetchStoreTweetDetailsById: 'tweets/fetchStoreTweetDetailsById',
        }),
        async fetch() {
            // this.profileUsername = this.$route.params.username;
            // console.log(this.accountInfo);
            try {
                if (this.profileUsername !== this.$auth.username) {
                    // eslint-disable-next-line max-len
                    const userInfo = await this.getProfile(this.profileUsername);
                    this.accountInfo = userInfo;
                    const { data } = await FollowApi(this.$axios).getFollowingData(this.profileUsername);
                    this.follower = data.data.followers;
                    this.following = data.data.followings;
                } else {
                    this.getMe();
                    this.accountInfo = this.accountStore;
                    this.follower = this.meFollower;
                    this.following = this.meFollowings;
                }
                this.fetchUserTweets(this.profileUsername);
            } catch (err) {
                this.snackbarError = true;
                console.error(err);
            }
        },
        async tryUpdateUser(fd) {
            try {
                await this.updateUser(fd);
                this.$toast.success('Profile updated successfully.');
                // this.fetch();
            } catch (e) {
                console.error(e);
                this.snackbarError = true;
            }
        },
        async initialize() {
            try {
                this.loading = true
                await Promise.all([
                    this.$store.dispatch('account/getme'),
                    this.$store.dispatch('account/getFollower'),
                    this.$store.dispatch('account/getFollowing'),
                ])
            } catch (e) {
                this.$toast.error(e.response.data.message)
            } finally {
                this.loading = false
            }
        },
        async follow() {
            try {
                this.loading = true
                // eslint-disable-next-line max-len
                const { data } = await this.doFollow(this.accountInfo.id)
                // this.initialize()
                // this.$toast.success(data.message);
            } catch (e) {
                this.$toast.error(e.response.data.message)
            } finally {
                this.loading = false
            }
        },
        async unfollow() {
            try {
                this.loading = true
                // eslint-disable-next-line max-len
                const { data } = await this.doUnfollow(this.accountInfo.id)
                // this.initialize()
                // this.$toast.success(data.message);
            } catch (e) {
                this.$toast.error(e.response.data.message)
            } finally {
                this.loading = false
            }
        },
        isFollowed() {
            const index = this.meFollowing.findIndex((item) => item.username == this.profileUsername)
            return index === -1
        },
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
                return this.$router.push('/tweet/' + id);
            } catch (err) {
                this.snackbarError = true;
                console.error(err);
            }
        },
    },

};
</script>
<style scoped>
.avatar-style {
    position: absolute;
    left: 0%;
    top: 70%
}

.following-style {
    text-decoration: none;
    color: inherit;
}

.following-style:hover {
    text-decoration: underline;
}
</style>