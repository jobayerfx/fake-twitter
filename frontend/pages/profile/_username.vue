<template>
    <v-container class="profile">
        <div v-if="!isLoaded">
            <BaseVProgressCircular />
        </div>
        <div v-if="isLoaded && accountInfo">
            <v-row class="pl-4">
                <v-avatar size="128">
                    <img :src="accountInfo.profile_photo" alt="avatar" />
                </v-avatar>
                <ProfileChangeDialog v-if="$auth.user.username === profileUsername" class="ml-auto" :user-data="accountInfo"
                    @update-user="tryUpdateUser" />
            </v-row>
            <v-row>
                <v-col>
                    <div class="text-h5 font-weight-bold">
                        {{ accountInfo?.name }}
                    </div>
                    <div class="subtitle-1 secondaryDarkGray--text">
                        @{{ accountInfo?.username }}
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

                        <span v-if="isEmptyWebsite" class="ml-2">
                            <v-icon>mdi-web</v-icon>
                            <a href="#">
                                {{ accountInfo.website }}
                            </a>
                        </span>
                    </div>
                </v-col>
            </v-row>



            <v-tabs v-model="selectedTab" background-color="transparent" color="primary" grow>
                <v-tab v-for="tab in tabs" :key="tab">
                    {{ tab }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="selectedTab">
                <v-tab-item v-for="tab in tabs" :key="tab">
                    <v-card flat>
                        <v-card-text>{{ tab }}</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </div>
        <BaseVSnackbar :is-visible="snackbarError" />
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// eslint-disable-next-line max-len
import ProfileChangeDialog from '../../components/Profile/ProfileChangeDialog.vue';
export default {
    components: { ProfileChangeDialog },
    middleware: ['isAuth'],
    data() {
        return {
            accountInfo: {},
            tabs: ['Tweets', 'Tweets and Replies', 'Media', 'Like'],
            selectedTab: null,
            snackbarError: false,
            isLoaded: false,
            // profileUsername: null
        };
    },

    computed: {
        ...mapGetters({
            accountStore: 'account/currentUser',
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
    },
    methods: {
        ...mapActions({
            getMe: 'account/getme',
            getProfile: 'account/getProfileByUsername',
            updateUser: 'account/updateUser',
        }),
        async fetch() {
            // this.profileUsername = this.$route.params.username;
            try {
                if (this.profileUsername !== this.accountInfo.username) {
                    // eslint-disable-next-line max-len
                    const userInfo = await this.getProfile(this.profileUsername);
                    this.accountInfo = userInfo;
                }
            } catch (err) {
                this.snackbarError = true;
                console.error(err);
            }
        },
        async tryUpdateUser(data) {
            try {
                await this.updateUser(data);
                await Promise.all([
                    this.$store.dispatch('account/getme'),
                ])
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
                ])
            } catch (e) {
                this.$toast.error(e.response.data.message)
            } finally {
                this.loading = false
            }
        },
    },

};
</script>