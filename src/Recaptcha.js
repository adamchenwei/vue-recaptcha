import recaptcha from './recaptcha-wrapper'

export default {
  name: 'VueRecaptcha',
  props: {
    sitekey: {
      type: String,
      required: true
    },
    theme: {
      type: String
    },
    badge: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: String
    },
    tabindex: {
      type: String
    }
  },
  mounted () {
    console.warn('--- MOUNTED RUN')
    this.renderCaptcha()

    setTimeout(() => {
      console.log('10s run!')
      this.renderCaptcha()
    }, 10000)
    this.renderCaptcha = this.renderCaptcha.bind(this)
    window.renderCaptcha = this.renderCaptcha
  },
  methods: {
    renderCaptcha () {
      console.warn('--- renderCaptcha RUN')
      recaptcha.checkRecaptchaLoad()
      const opts = {
        ...this.$props,
        callback: this.emitVerify,
        'expired-callback': this.emitExpired
      }
      const container = this.$slots.default ? this.$el.children[0] : this.$el
      recaptcha.render(container, opts, id => {
        console.warn('------------- widget id')
        console.warn(id)
        this.$widgetId = id
        this.$emit('render', id)
      })
    },
    reset () {
      recaptcha.reset(this.$widgetId)
    },
    execute () {
      recaptcha.execute(this.$widgetId)
    },
    emitVerify (response) {
      this.$emit('verify', response)
    },
    emitExpired () {
      this.$emit('expired')
    }
  },
  render (h) {
    console.warn('slot default is ')
    console.warn(this.$slots.default)
    return h('div', {}, this.$slots.default)
  }
}
