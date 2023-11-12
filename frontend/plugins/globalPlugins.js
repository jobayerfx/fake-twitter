import Vue from 'vue'
import momentTimezone from 'moment-timezone'
// import validationMixin from '@/mixins/validationMixin'

Vue.mixin({
  data() {
    return {}
  },
  // computed: {
  //   bp() {
  //     return this.$vuetify.breakpoint
  //   }
  // },

  methods: {
    formatTimeZone(date) {
      const momentDate = momentTimezone(date)
      return momentDate.tz('Asia/Dhaka').format('lll')
    },
    formatTime(date) {
      const momentDate = momentTimezone(date)
      return momentDate.tz('Asia/Dhaka').format('Y-m-d H:i:s')
    },
    formatDate(date) {
      const momentDate = momentTimezone(date)
      return momentDate.tz('Asia/Dhaka').format('MMMM y')
    },
    timeSince(date) {
      let seconds = Math.floor((new Date() - date) / 1000)
      let interval = seconds / 31536000

      if (interval > 1) {
        return Math.floor(interval) + ' years'
      }
      interval = seconds / 2592000
      if (interval > 1) {
        return Math.floor(interval) + ' months'
      }
      interval = seconds / 86400
      if (interval > 1) {
        return Math.floor(interval) + ' days'
      }
      interval = seconds / 3600
      if (interval > 1) {
        return Math.floor(interval) + ' hours'
      }
      interval = seconds / 60
      if (interval > 1) {
        return Math.floor(interval) + ' minutes'
      }
      return Math.floor(seconds) + ' seconds'
    },
    formatNumber(data) {
      return Intl.NumberFormat('en', { notation: 'compact' }).format(data)
    },
    formatDecimal(data, maximum = 2) {
      return Intl.NumberFormat('en', {
        maximumFractionDigits: maximum
      }).format(data)
    }
  }
})
// Vue.mixin(validationMixin)
