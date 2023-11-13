<template>
    <v-container>
        <v-card plain>
            <v-tabs color="deep-purple-accent-4" align-tabs="center">
                <v-tab class="text-capitalize">Followers</v-tab>
                <v-tab class="text-capitalize">Followings</v-tab>

                <v-tab-item>
                    <TabFollowUserList :user-list="followerList" @follow="follow" @unfollow="unfollow"
                        @initialize="initialize" />
                </v-tab-item>
                <v-tab-item>
                    <TabFollowUserList :user-list="followingList" @follow="follow" @unfollow="unfollow"
                        @initialize="initialize" />
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>
<script>

import TabFollowUserList from '../../components/Profile/TabFollowUserList.vue';
import { FollowApi } from '@/service'
export default {
    components: { TabFollowUserList },
    middleware: ['isAuth'],
    data() {
        return {
            loading: false,
            tab: null,
            followerList: [],
            followingList: [],
        };
    },
    mounted() {
        this.initialize();
    },
    methods: {
        async initialize() {
            try {
                this.loading = true
                const username = this.$route.params.username;
                const { data } = await FollowApi(this.$axios).getFollowingData(username);
                this.followerList = data.data.followers;
                this.followingList = data.data.followings;
            } catch (e) {
                this.$toast.error(e.response.data.message)
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