<template>
    <v-row>
        <v-col>
            <v-menu v-model="isMenu" offset-y>
                <template #activator="{ on, attrs }">
                    <v-list rounded>
                        <v-list-item-group>
                            <v-list-item v-bind="attrs" v-on="on">
                                <v-list-item-avatar>
                                    <v-img v-if="$auth.user?.profile_photo" :src="$auth.user?.profile_photo"></v-img>
                                    <v-icon v-else size="56">
                                        mdi-account-circle
                                    </v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ $auth.user?.name }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        @{{ $auth.user?.username }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </template>
                <v-list rounded>
                    <v-list-item-group>
                        <v-list-item @click="exit">
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-menu>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "LayoutUser",
    data() {
        return {
            isMenu: false,
            items: [],
        };
    },
    methods: {
        exit() {
            this.$emit('sign-out');
        },
    },
};
</script>

<style scoped></style>