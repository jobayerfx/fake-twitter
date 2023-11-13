<template>
    <v-container fluid class="profile-header-container">
        <!-- Cover Photo -->
        <v-img src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg" height="200"
            gradient="to top, rgba(0,0,0,0.5), rgba(0,0,0,0)" class="cover-photo">
            <div class="avatar-container">
                <v-avatar size="120">
                    <v-img src="https://www.w3schools.com/howto/img_avatar.png" class="avatar-image"></v-img>
                </v-avatar>
            </div>

        </v-img>
    </v-container>
</template>
  
<script>
export default {
    name: 'ProfileHeader',
};
</script>
  
<style scoped>
.profile-header-container {
    position: relative;
}

.cover-photo {
    position: relative;
}

.avatar-container {
    position: absolute;
    bottom: -60px;
    /* Adjust this value to control how much the avatar extends outside */
    left: 13%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
}

.avatar {
    border: 5px solid white;
    /* Adjust the border width as needed */
}

.avatar-image {
    border-radius: 50%;
    /* Ensure the avatar is circular */
}
</style>