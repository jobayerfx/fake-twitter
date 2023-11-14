<template>
    <div class="main-page">
        <v-row>
            <MainPageLeftSide />
            <MainPageRightSide />
        </v-row>
        <v-footer height="78px">
            <v-row justify="center" no-gutters>
                <span v-for="link in footerItems" :key="link" variant="text" class="mx-2 text-subtitle-2">
                    {{ link }}
                </span>
            </v-row>
        </v-footer>
    </div>
</template>

<script>
import MainPageLeftSide from '../components/Base/MainPageLeftSide.vue'
import MainPageRightSide from '../components/Base/MainPageRightSide.vue'
export default {
    components: { MainPageLeftSide, MainPageRightSide },
    layout: 'empty',
    auth: false,
    data() {
        return {
            footerItems: [
                'About',
                'Download the X app',
                'Help Center',
                'Terms of Service',
                'Privacy Policy',
                'Cookie Policy',
                'Accessibility',
                'Ads info',
                'Blog',
                'Status',
                'Careers',
                'Brand Resources',
                'Advertising',
                'Marketing',
                'X for Business',
                'Developers',
                'Directory',
                'Settings',
                '© 2023 X Corp.'
            ]
        };
    },
};
</script>
<style scoped>
.main-page {
    padding: 20px;
}

.underline-text {
    text-decoration: underline;
}

@media (max-width: 600px) {
    .main-page {
        padding: 10px;
    }
}
</style>