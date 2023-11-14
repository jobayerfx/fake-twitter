export default {
  data() {
    return {
      imagePreviewURL: null,
      profileImagePreviewURL: null,
      portalPreviewURL: null,
      retinaPreviewURL: null,
      favPreviewURL: null,
      portalLogo: null,
      retinaLogo: null,
      favIconLogo: null,
      profileImage: null,
      authUserProfile: null,
      btnLoading: false,
      userManualData: [],
      profile_url: {
        id: null,
        fileName: null,
        resourceId: null,
        fileUrl: null,
        type: null,
        descriptions: null,
        fileType: null,
        fileSize: null
      },
      thumbnail: null,
      file: null
    }
  },

  watch: {},

  methods: {
    onFileChange(payload) {
      // const file = payload.target.files[0]; // use it in case of normal HTML input
      const file = payload.target.files[0] // in case vuetify file input
      this.profileImage = file
      if (file) {
        this.messagePayload = file
        this.messageFileRemoveKey = true
        if (
          file.type === 'image/png' ||
          file.type === 'image/jpg' ||
          file.type === 'image/jpeg'
        ) {
          this.portalLogo = file
          this.imagePreviewURL = URL.createObjectURL(file)
          URL.revokeObjectURL(file) // free memory
          this.messageFile = file.name
        } else if (
          file.type === 'application/x-zip-compressed' ||
          file.type === 'application/pdf' ||
          file.type === 'application/docx' ||
          file.type === 'video/mp4' ||
          file.type === 'text/plain' ||
          file.type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type ===
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ) {
          this.messageFile = file.name
        } else {
          this.messageErrorMessage =
            'File Accept Only png/jpg, docx/pdf/pptx, zip, text files'
          this.messageFileRemoveKey = false
        }
      } else {
        this.imagePreviewURL = null
        this.messageFileRemoveKey = false
      }
    },
    onRetinaChange(payload) {
      // const file = payload.target.files[0]; // use it in case of normal HTML input
      const file = payload.target.files[0] // in case vuetify file input
      this.profileImage = file
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg'
      ) {
        this.retinaLogo = file
        this.retinaPreviewURL = URL.createObjectURL(file)
        URL.revokeObjectURL(file) // free memory
      }
    },
    onFavChange(payload) {
      // const file = payload.target.files[0]; // use it in case of normal HTML input
      const file = payload.target.files[0] // in case vuetify file input
      this.favIconLogo = file
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg'
      ) {
        this.favPreviewURL = URL.createObjectURL(file)
        URL.revokeObjectURL(file) // free memory
      }
    },

    onFileInput(payload) {
      // console.log(payload.name)
      // console.log(payload.type)
      this.imagePreviewURL = URL.createObjectURL(payload)
      this.portalLogo = payload
    }
  }
}
