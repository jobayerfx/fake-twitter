<template>
    <div class="profile-change-info">
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" class="text-capitalize" text rounded outlined>Edit Profile</v-btn>
            </template>
            <v-card rounded>
                <v-card-title class="pl-4 d-flex justify-space-between">
                    <div>
                        <v-btn class="mr-auto" icon color="black" @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <span class="headline">Edit Profile </span>
                    </div>
                    <v-btn class="primary text-capitalize text-white" type="submit" text :disabled="!isValid" rounded
                        @click="update">
                        Save
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form v-model="isValid">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-avatar size="120">
                                        <v-img :src="imagePreviewURL ? imagePreviewURL : image" class="rounded-circle"
                                            :alt="image">
                                            <input type="file" ref="file" style="display: none" @change="onFileChange">
                                            <div class="d-flex white--text black v-card--reveal" style="height: 30%;"
                                                v-model="im" @click="$refs.file.click()">

                                                <v-icon x-small dark style="margin-left: -10px">
                                                    mdi-camera
                                                </v-icon>
                                                <v-card-text class="white--text"
                                                    style="font-size: 10px; margin-left: -60px">
                                                    Add Photo
                                                </v-card-text>
                                            </div>

                                        </v-img>
                                    </v-avatar>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="fullname" :initialValue="userData.name" label="Name"
                                        :rules="[rules.required]" outlined auto-grow></v-text-field>
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
import image from '../../static/profile.png'
import imageUploadMixin from "../../mixins/imageUploadMixin";
import validationMixin from "../../mixins/validationMixin";
export default {
    name: "ProfileChangeDialog",
    mixins: [imageUploadMixin, validationMixin],
    // props: {
    //     userData: {
    //         type: Object,
    //         required: true,
    //     }
    // },
    props: ['userData'],
    data() {
        return {
            image,
            dialog: false,
            isValid: false,
            fullname: '',
            bio: '',
            website: '',
            location: '',
            imagePreviewURL: null,
            im: '',
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
    watch: {
        immediate: true,
        userData: function (newVal, oldVal) {
            this.fullname = newVal.name;
            this.bio = newVal.bio;
            this.website = newVal.website;
            this.location = newVal.location;
            this.imagePreviewURL = newVal.profile_photo;
        }
    },
    created() {
        if (this.userData !== undefined) {
            this.fullname = this.userData.name;
            this.bio = this.userData.bio;
            this.website = this.userData.website;
            this.location = this.userData.location;
            this.imagePreviewURL = this.userData.profile_photo;
        }
    },
    methods: {
        closeDialog() {
            this.dialog = false;
        },
        update() {
            const formData = new FormData()
            if (this.profileImage) {
                const fr = new FileReader()
                fr.readAsDataURL(this.profileImage)
                fr.addEventListener('load', () => {
                    this.profile_url.fileUrl = fr.result
                })
                formData.append('profile_photo', this.profileImage)
                // formData.append('id', beaconId)
            }
            formData.append('name', this.fullname ? this.fullname : '')
            formData.append('bio', this.bio ? this.bio : '')
            formData.append('website', this.website ? this.website : '')
            formData.append('location', this.location ? this.location : '')
            // formData.append('dob', this.dob ? this.dob : '')
            formData.append('id', this.$auth.user.id)
            this.$emit('update-user', formData);
            this.dialog = false;
        },
        chooseFiles() {
            document.getElementById("fileUpload").click()
        },
    },

};
</script>

<style scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
}

.mdi-camera {
    color: #E5E5E5;

}

#preview {
    display: flex;
    justify-content: center;
    align-items: center;
}

#preview img {
    max-width: 100%;
    max-height: 500px;
}
</style>