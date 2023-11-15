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

                    <UserCardList :user-list="searchList" @follow="follow" @unfollow="unfollow" @initialize="reset" />

                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import UserCardList from '../components/Common/UserCardList.vue';
import BaseVProgressCircular from '../components/Base/BaseVProgressCircular.vue';
import { FollowApi } from '@/service'
export default {
    components: { UserCardList, BaseVProgressCircular },
    // middleware: ['isAuth'],
    data() {
        return {
            isLoaded: false,
            loading: false,
            tab: null,
            // searchList: [],
        };
    },
    computed: {
        ...mapGetters({
            searchList: 'account/searchData',
        }),
        q() {
            return this.$route.query.q;
        }
    },
    watch: {
        $route(nv, ov) {
            this.doSearch({ search: nv.query.q });
        },
    },
    mounted() {
        this.isLoaded = true;
        this.initialize(this.q);
    },
    methods: {
        ...mapActions({
            doSearch: 'account/fetchSearchData',
            doFollow: 'account/doFollow',
            doUnfollow: 'account/doUnfollow',
        }),
        reset() { },
        async initialize(query) {
            try {
                this.loading = true
                const q = { search: query };
                await Promise.all([
                    this.$store.dispatch('account/fetchSearchData', q),
                ])
            } catch (e) {
                // this.$toast.error(e.response.data.message)
            } finally {
                this.loading = false
            }
        },
        async follow(id) {
            try {
                this.loading = true
                // const { data } = await FollowApi(this.$axios).follow(id)
                // this.initialize()
                const { data } = await this.doFollow(id)
                this.$toast.success('Followed successfully');
            } catch (e) {
                this.$toast.error(e.response.data.message)
            } finally {
                this.loading = false
            }
        },
        async unfollow(id) {
            try {
                this.loading = true
                // const { data } = await FollowApi(this.$axios).unfollow(id)
                // this.initialize()
                const { data } = await this.doUnfollow(id)
                this.$toast.success('Unfollowed successfully');
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