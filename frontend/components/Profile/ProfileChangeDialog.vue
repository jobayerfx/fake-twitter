<template>
    <div class="profile-change-info">
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text rounded outlined>Edit Profile</v-btn>
            </template>
            <v-card rounded>
                <v-card-title class="pl-4 custom-center">
                    <v-btn class="mr-auto" icon color="black" @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <span class="headline">Edit Profile </span>
                    <v-btn color="white" class="save-btn" text :disabled="!isValid" @click="update" rounded>
                        Save
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form v-model="isValid">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="fullname" label="Name" :rules="[rules.required]" outlined
                                        auto-grow></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="bio" label="Bio" counter="500" rows="3" auto-grow outlined
                                        auto-grow></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="website" label="Website" hint="example.com" outlined
                                        auto-grow></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="location" label="Location" persistent-hint outlined
                                        auto-grow></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "ProfileChangeDialog",
    props: {
        userData: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            dialog: false,
            isValid: false,
            fullname: '',
            bio: '',
            website: '',
            location: '',
            // fullnameRules: [
            //     (v) => !!v || 'Name is required',
            //     (v) => v.length <= 40 || 'Name is too long',
            //     (v) => v.length >= 2 || 'Name is too short',
            // ],
            // aboutRules: [(v) => v.length <= 500 || 'Description is too long'],
            rules: {
                required: (v) => !!v || 'Name is required',
                DescToolong: (v) => v.length <= 500 || 'Description is too long',
                nameTooLong: (v) => v.length <= 40 || 'Name is too long',
                nameTooShort: (v) => v.length >= 2 || 'Name is too short',
            }
        };
    },
    mounted() {
        this.fullname = this.userData.name;
        this.bio = this.userData.bio;
        this.website = this.userData.website;
        this.location = this.userData.location;
    },
    methods: {
        closeDialog() {
            this.dialog = false;
        },
        update() {
            const data = {
                name: this.fullname,
                bio: this.bio,
                website: this.website,
                location: this.location,
                id: this.userData.id,
            };
            this.$emit('update-user', data);
            this.dialog = false;
        },
    },

};
</script>

<style scoped>
.save-btn {
    background-color: #111111;
    color: #ffffff;
}

.custom-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>