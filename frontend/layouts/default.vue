<!-- eslint-disable vue/component-definition-name-casing -->
<template>
    <v-app>
        <v-navigation-drawer width="320" app>
            <v-container class="fill-height">
                <LayoutNavigation class="mb-auto" />
                <v-spacer />
                <LayoutUser class="mt-auto" @sign-out="signOutFromAccount" />
            </v-container>
        </v-navigation-drawer>

        <v-app-bar height="56" color="white" flat app>
            <span class="font-weight-black text-h6">
                <v-btn v-if="isTweetDetails()" icon color="black" @click="$router.go(-1)">
                    <v-icon> mdi-arrow-left </v-icon>
                </v-btn>
                {{ title }}
            </span>
        </v-app-bar>

        <v-main>
            <v-container>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="10" md="10">
                        <Nuxt />
                    </v-col>
                </v-row>
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
import { mapActions } from 'vuex';
import LayoutNavigation from '../components/Common/LayoutNavigation';
import LayoutSearch from '../components/Common/LayoutSearch.vue';
import LayoutLastUsers from '../components/Common/LayoutLastUsers.vue';
import LayoutUser from '../components/Common/LayoutUser.vue';
export default {
    // eslint-disable-next-line vue/component-definition-name-casing
    name: 'default',
    components: { LayoutNavigation, LayoutUser, LayoutSearch, LayoutLastUsers },
    middleware: ['isAuth'],
    // computed: mapState([
    //     'account'
    // ]),
    computed: {
        title() {
            switch (this.$route.name) {
                case 'home': {
                    return 'Home';
                }
                case 'profile-username': {
                    return 'Profile';
                }
                default: {
                    return 'Tweet';
                }
            }
        },
    },
    methods: {
        ...mapActions({
            addTweet: 'tweets/addTweet',
        }),
        onClickTweet(text) {
            try {
                this.addTweet(text);
            } catch (err) {
                console.error(err);
            }
        },
        signOutFromAccount() {
            this.$auth.logout();
            return this.$router.push('/');
        },
        isMobile() {
            if (
                this.$vuetify.breakpoint.name === 'xs' ||
                this.$vuetify.breakpoint.name === 'sm'
            )
                return true;
            return false;
        },

        isTweetDetails() {
            // console.log(this.$route.name);
            if (this.$route.name === 'home') {
                return false;
            }
            return true;
        },
    },
};
</script>

<style scoped></style>