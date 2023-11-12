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
            <span class="font-weight-black text-h6 px-2"> Who to read </span>

            <v-divider></v-divider>

            <v-list-item-group>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img
                            src="https://images.unsplash.com/photo-1603610515737-193e0b423983?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=1350&q=80"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">
                            The New York Times
                        </v-list-item-title>
                        <v-list-item-subtitle> @nytimes </v-list-item-subtitle>
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
