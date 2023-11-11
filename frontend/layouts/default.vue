<template>
    <v-app>
        <v-navigation-drawer width="320" app>
            <v-container class="fill-height">
                <LayoutNavigation class="mb-auto" />
                <v-spacer />
                <LayoutUser class="mt-auto" :user-data="accountStore" @sign-out="signOutFromAccount" />
            </v-container>
        </v-navigation-drawer>

        <v-app-bar height="56" color="white" flat app>
            <span class="font-weight-black text-h6">
                <v-btn v-if="isTweetDetails" icon color="primary" @click="$router.go(-1)">
                    <v-icon> mdi-arrow-left </v-icon>
                </v-btn>
                {{ title }}
            </span>
        </v-app-bar>

        <v-main>
            <v-container>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="10" md="8">
                        <Nuxt />
                    </v-col></v-row>
            </v-container>
        </v-main>

        <v-navigation-drawer right width="384" app>
            <v-col>
                <LayoutSearch />
                <LayoutLastUsers />
            </v-col>
        </v-navigation-drawer>
    </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LayoutNavigation from '../components/Layout/LayoutNavigation';
import LayoutSearch from '../components/Layout/LayoutSearch.vue';
import LayoutLastUsers from '../components/Layout/LayoutLastUsers.vue';
import LayoutUser from '../components/Layout/LayoutUser.vue';
export default {
    name: 'Default',
    components: { LayoutNavigation, LayoutUser, LayoutSearch, LayoutLastUsers },
    middleware: ['isAuth'],
    ...mapState({
        accountStore: 'account',
    }),
    isMobile() {
        if (
            this.$vuetify.breakpoint.name === 'xs' ||
            this.$vuetify.breakpoint.name === 'sm'
        )
            return true;
        return false;
    },
    title() {
        switch (this.$route.path) {
            case '/home': {
                return 'Home';
            }
            case '/profile': {
                return 'Profile';
            }
            default: {
                return 'Tweet';
            }
        }
    },
    isTweetDetails() {
        if (this.$route.path.split('/').includes('tweet')) {
            return true;
        }
        return false;
    },
    methods: {
        ...mapActions({
            addTweet: 'tweets/addTweet',
            signOut: 'signOut',
        }),
        onClickTweet(text) {
            try {
                this.addTweet(text);
            } catch (err) {
                console.error(err);
            }
        },
        signOutFromAccount() {
            this.signOut();
            this.$router.push('/');
        },
    },
};
</script>

<style scoped></style>