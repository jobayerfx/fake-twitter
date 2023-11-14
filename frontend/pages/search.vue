<template>
    <v-container>

        <div v-if="!isLoaded">
            <v-skeleton-loader boilerplate type="actions"></v-skeleton-loader>

            <div class="big-divider"></div>

            <BaseVProgressCircular />
        </div>
        <v-row v-if="searchList.length">
            <v-col cols="8">
                <div class="text-h5 font-weight-bold">
                    People
                </div>
            </v-col>
        </v-row>
        <v-row v-else-if="isLoaded">
            <v-col cols="8">
                <div class="text-h5 font-weight-bold">
                    No results for "{{ q }}"
                </div>
                <div class="subtitle-1 secondaryDarkGray--text">
                    Try searching for something else, or check your Search settings to see if they’re protecting you from
                    potentially sensitive content.
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card plain elevation="0">

                    <UserCardList :user-list="searchList" @follow="follow" @unfollow="unfollow" @initialize="initialize" />

                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>
<script>
import UserCardList from '../components/Common/UserCardList.vue';
import BaseVProgressCircular from '../components/Base/BaseVProgressCircular.vue';
import { AuthApi, FollowApi } from '@/service'
export default {
    components: { UserCardList, BaseVProgressCircular },
    // middleware: ['isAuth'],
    data() {
        return {
            isLoaded: false,
            loading: false,
            tab: null,
            searchList: [],
        };
    },
    computed: {
        q() {
            return this.$route.query.q;
        }
    },
    watch: {
        $route(nv, ov) {
            this.initialize(nv.query.q);
        },
    },
    mounted() {
        this.isLoaded = true;
        this.initialize(this.q);
    },
    methods: {
        async initialize(query) {
            try {
                this.loading = true
                const q = { search: query };
                const { data } = await AuthApi(this.$axios).searchUser(q);
                this.searchList = data.data;
            } catch (e) {
                // this.$toast.error(e.response.data.message)
            } finally {
                this.loading = false
            }
        },
        async follow(id) {
            try {
                this.loading = true
                // eslint-disable-next-line max-len
                const { data } = await FollowApi(this.$axios).follow(id)
                this.initialize()
                this.$toast.success(data.message);
            } catch (e) {
                this.$toast.error(e.response.data.message)
            } finally {
                this.loading = false
            }
        },
        async unfollow(id) {
            try {
                this.loading = true
                const { data } = await FollowApi(this.$axios).unfollow(id)
                this.initialize()
                this.$toast.success(data.message);
            } catch (e) {
                this.$toast.error(e.response.data.message)
            } finally {
                this.loading = false
            }
        },

    }
};
</script>
<style scoped></style>