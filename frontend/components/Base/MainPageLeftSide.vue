<template>
    <v-col cols="0" sm="6" class="main-page__left-side hidden-sm-and-down">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="twitter-large-logo">
            <g>
                <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                </path>
            </g>
        </svg>
    </v-col>
</template>

<script>
export default {
    name: "MainPageLeftSide"
}
</script>
<style scoepd>
.main-page__left-side {

    height: calc(100vh - 78px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.main-page__left-side__list-title {
    font-size: 1.25rem;
    font-weight: 500;
}

.twitter-large-logo {
    max-height: 380px;
    height: 70%;
    -ms-flex-pack: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    color: rgba(15, 20, 25, 1.00);
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    vertical-align: text-bottom;
    position: relative;
    max-width: 100%;
    fill: currentcolor;
    padding: 32px;
    display: inline-block;
}

@media only screen and (max-width: 768px) {
    .twitter-large-logo {
        padding: 16px;
    }
}

@media only screen and (max-width: 480px) {
    .twitter-large-logo {
        height: 100%;
    }
}
</style>