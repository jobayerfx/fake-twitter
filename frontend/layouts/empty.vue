<template>
    <v-app>
        <Nuxt />
    </v-app>
</template>
<script>
export default {
    // eslint-disable-next-line vue/component-definition-name-casing
    name: 'empty',
    middleware: ['isNoAuth'],
    auth: false,
}
</script>