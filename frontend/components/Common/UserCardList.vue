<template>
    <v-container fluid>
        <v-list>
            <v-list-item-group>
                <v-list-item v-for="user in userList" :key="user.username">
                    <NuxtLink :to="`/profile/${user.username}`" style="text-decoration: none; color: inherit;">
                        <v-list-item-avatar>
                            <v-img v-if="user.profile_photo" :src="user.profile_photo"></v-img>
                            <v-icon v-else size="56">
                                mdi-account-circle
                            </v-icon>
                        </v-list-item-avatar>
                    </NuxtLink>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">
                            <NuxtLink :to="`/profile/${user.username}`" style="text-decoration: none; color: inherit;">{{
                                user.name }}</NuxtLink>
                        </v-list-item-title>
                        <v-list-item-subtitle> @{{ user.username }} </v-list-item-subtitle>
                        <v-list-item-subtitle> {{ user.bio }} </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn v-if="isFollowed(user.id)" rounded @click="follow(user.id)"
                            class="secondaryDarkGray white-text text-capitalize">Follow</v-btn>
                        <v-btn v-else rounded @click="unfollow(user.id)" class="text-capitalize">Unfollow</v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-container>
</template>
  
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'UserCardList',
    props: {
        userList: {
            type: Array
        }
    },
    computed: {
        ...mapGetters({
            following: 'account/followingUser',
        }),
    },
    mounted() {
        this.initialLoad();
    },
    methods: {
        async initialLoad() {
            try {
                await Promise.all([
                    this.$store.dispatch('account/getFollowing'),
                ])
            } catch (e) {
                this.$toast.error(e.response.data.message)
            }
        },
        follow(id) {
            this.$emit('follow', id);
            this.$emit('initialize');
            this.initialLoad();
        },
        unfollow(id) {
            this.$emit('unfollow', id);
            this.$emit('initialize');
            this.initialLoad();
        },
        isFollowed(id) {
            // if (this.following.lenght === 0) return false;
            const index = this.following.findIndex((item) => item.id === id)
            return index === -1
        }
    }
};
</script>