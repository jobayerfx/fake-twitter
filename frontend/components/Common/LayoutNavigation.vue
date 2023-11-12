<template>
    <v-row>
        <v-col>
            <v-list rounded nav class="left-sidebar-menu">
                <v-list-item-group>
                    <v-list-item disabled>
                        <v-btn icon color="primary">
                            <svg viewBox="0 0 24 24" aria-hidden="true"
                                class="r-18jsvk2 r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp">
                                <g>
                                    <path
                                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                    </path>
                                </g>
                            </svg>
                        </v-btn>
                    </v-list-item>
                    <v-list-item v-for="item in items" :key="item.title" @click="openPage(item.to)">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="text-h6 font-weight-bold" v-text="item.title" />
                        </v-list-item-content>
                    </v-list-item>
                    <v-dialog class="rounded-lg" v-model="tweetDialog" width="600">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mt-6" color="primary" x-large block rounded v-bind="attrs" v-on="on">Post</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="pl-2">
                                <v-btn class="mr-auto" icon color="primary" @click="tweetDialog = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text class="px-0 pr-2">
                                <HomeTweetAdd />
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-list-item-group>
            </v-list>
        </v-col>
    </v-row>
</template>

<script>
import HomeTweetAdd from '../../components/Home/HomeTweetAdd.vue';
export default {
    name: "LayoutNavigation",
    components: { HomeTweetAdd },
    data() {
        return {
            tweetDialog: false,
            username: "",
            items: [
                {
                    icon: 'mdi-home-variant',
                    title: 'Home',
                    to: '/home',
                },
                {
                    icon: 'mdi-magnify',
                    title: 'Explore',
                    // to: '/explore',
                },
                {
                    icon: 'mdi-bell-outline',
                    title: 'Notifications',
                    // to: '/notifications',
                },
                {
                    icon: 'mdi-email-outline',
                    title: 'Messages',
                    // to: '/messages',
                },

                {
                    icon: 'mdi-bookmark-outline',
                    title: 'bookmarks',
                    // to: '/bookmarks',
                },
                {
                    icon: 'mdi-list-box-outline',
                    title: 'lists',
                    // to: '/lists',
                },
                {
                    icon: 'mdi-account-outline',
                    title: 'Profile',
                    to: '/profile/' + this.$auth.user.username,
                },
            ],
        };
    },
    created() {
        // if (this.$auth.user) {
        //     this.initUser()
        // }
    },
    initUser() {
        // eslint-disable-next-line max-len
        this.username = this.$auth.user && this.$auth.user.username ? this.$auth.user.username : 'Loading..'
    },
    methods: {
        openPage(url) {
            if (url) {
                this.$router.push(url);
            }
        },
    },
};
</script>
<style scoped>
.left-sidebar-menu {
    padding: 0 5% 0 18%;
}

.v-list-item.v-list-item--link {
    margin-bottom: 0 !important;
}
</style>