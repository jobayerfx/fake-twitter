<template>
    <div class="tags-and-recomendations">
        <v-list color="secondaryExtraExtraLightGray rounded-lg" flat>
            <span class="font-weight-black text-h6 px-2">
                Trends for you
            </span>

            <v-divider></v-divider>

            <v-list-item-group>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle>
                            Sports · Trending
                        </v-list-item-subtitle>
                        <v-list-item-title class="font-weight-bold">
                            #CWC23
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            201,343k posts
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle>
                            Entertainment · Trending
                        </v-list-item-subtitle>
                        <v-list-item-title class="font-weight-bold">
                            #MunawarFaruqui𓃵
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            27K posts
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle>
                            Trending in Bangladesh
                        </v-list-item-subtitle>
                        <v-list-item-title class="font-weight-bold">
                            #Army
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            383K posts
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <v-list color="secondaryExtraExtraLightGray rounded-lg mt-4" flat>
            <span class="font-weight-black text-h6 px-2"> Who to follow </span>

            <v-divider></v-divider>

            <v-list-item-group>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">
                            Rishi Sunak
                        </v-list-item-title>
                        <v-list-item-subtitle> @rishiSunak </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>
<script>
export default {
    name: "LayoutLastUsers",
}
</script>
