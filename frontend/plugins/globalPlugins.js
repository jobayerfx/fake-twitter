import Vue from 'vue'
import momentTimezone from 'moment-timezone'
import validationMixin from '@/mixins/validationMixin'

Vue.mixin({
  data() {},
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
Vue.mixin(validationMixin)
