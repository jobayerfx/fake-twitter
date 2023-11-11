<template>
    <v-snackbar :value="isVisible" top light color="errorPink">
        Something went wrong, but don't worry - let's try again.
    </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: "BaseVSnackbar",
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        }
    }
})
</script>