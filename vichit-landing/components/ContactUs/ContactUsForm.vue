<template>
  <div class="contact-us-form">
    <div class="row">
      <vt-tooltip
        :key="`${formKey}-firstName`"
        anchor-tag="div"
        wrapper-tag="div"
        class="row__input"
        :follow-cursor="false"
        trigger="focusin"
        placement="right-start"
        :interactive="false"
        :hide-on-click="false"
        :fallback-placements="['top', 'bottom']"
      >
        <vt-text-field
          ref="vt-text-field-0"
          v-model="formData.firstName"
          label-text="First name"
          :show-error-message="showErrorMessage"
          required
          :error-message="errors.firstName"
          @blur="setErrorByKey('firstName')"
          @init="onInitTextField(1)"
        />
        <template #content>
          {{ $t('contact-us-tooltip-first-name') }}
        </template>
      </vt-tooltip>
      <vt-tooltip
        :key="`${formKey}-email`"
        anchor-tag="div"
        wrapper-tag="div"
        class="row__input"
        :follow-cursor="false"
        trigger="focus focusin"
        placement="right-start"
        :interactive="false"
        :hide-on-click="false"
        :fallback-placements="['top', 'bottom']"
      >
        <vt-text-field
          ref="vt-text-field-1"
          v-model="formData.email"
          label-text="Email"
          type="email"
          :show-error-message="showErrorMessage"
          required
          :error-message="errors.email"
          @init="onInitTextField(2)"
          @blur="setErrorByKey('email')"
        />
        <template #content>
          {{ $t('contact-us-tooltip-email') }}
        </template>
      </vt-tooltip>
    </div>
    <div class="row">
      <vt-tooltip
        :key="`${formKey}-phone`"
        anchor-tag="div"
        wrapper-tag="div"
        class="row__input"
        :follow-cursor="false"
        trigger="focus focusin"
        placement="right-start"
        :interactive="false"
        :hide-on-click="false"
        :fallback-placements="['top', 'bottom']"
      >
        <vt-text-field
          ref="vt-text-field-2"
          v-model="formData.phone"
          v-mask="numberMask"
          label-text="Phone number"
          :show-error-message="showErrorMessage"
          :error-message="errors.phone"
          @init="onInitTextField(3)"
          @blur="setErrorByKey('phone')"
        />
        <template #content>
          {{ $t('contact-us-tooltip-phone') }}
        </template>
      </vt-tooltip>
      <vt-tooltip
        :key="`${formKey}-country`"
        anchor-tag="div"
        wrapper-tag="div"
        class="row__input"
        :follow-cursor="false"
        trigger="focus focusin"
        placement="right-start"
        :interactive="false"
        :hide-on-click="false"
        :fallback-placements="['top', 'bottom']"
      >
        <vt-dropdown
          ref="vt-text-field-3"
          v-model="formData.country"
          :items="countries"
          :has-init="hasInitDropDown"
          :error-message="errors.country"
          :show-error-message="showErrorMessage"
          required
          label-text="Country"
          @init="onInitTextField(4)"
          @blur="setErrorByKey('country')"
          @input="setErrorByKey('country')"
        />
        <template #content>
          {{ $t('contact-us-tooltip-country') }}
        </template>
      </vt-tooltip>
    </div>
    <vt-tooltip
      :key="`${formKey}-company`"
      anchor-tag="div"
      wrapper-tag="div"
      class="row__input"
      :follow-cursor="false"
      trigger="focus focusin"
      placement="right-start"
      :interactive="false"
      :hide-on-click="false"
      :fallback-placements="['top', 'bottom']"
    >
      <vt-text-field
        ref="vt-text-field-4"
        v-model="formData.company"
        label-text="Company"
        :show-error-message="showErrorMessage"
        width-content
        @init="onInitTextField(5)"
      />
      <template #content>
        {{ $t('contact-us-tooltip-company') }}
      </template>
    </vt-tooltip>
    <vt-text-field
      :key="`${formKey}-message`"
      ref="vt-text-field-5"
      v-model="formData.message"
      :show-error-message="showErrorMessage"
      label-text="Message or question"
      class="row__input"
      tag="textarea"
    />
    <uploader
      class="row__input text-sm"
      :is-init="isInitToggleButton"
      @input="formData.file = $event"
      @on-error="setHasErrorFile"
    />
    <toggle-button
      v-model="formData.sendDNA"
      :label="$t('contact-us-dna')"
      :is-init="isInitToggleButton"
    />
    <toggle-button
      v-model="formData.personalData"
      :is-init="isInitToggleButton"
      :label="$t('contact-us-personal-data')"
    />
    <fade-in>
      <div
        v-if="showSubmitButton"
        class="w-full min-w-full flex justify-center"
      >
        <vt-gradient-button type="primary" :loading="loading" @click="submit">
          {{ $t('contact-us-submit') }}
        </vt-gradient-button>
      </div>
    </fade-in>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import countries from '@/components/ContactUs/countries.json'
import FadeIn from '@/components/Transitions/fade-in'
import Uploader from '@/components/Form/Uploader'
import ToggleButton from '@/components/Form/ToggleButton'
const { mapGetters } = createNamespacedHelpers('store')
const numberMask = createNumberMask({
  prefix: '',
  thousandsSeparatorSymbol: '',
})
// ?? /^(?:\+\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-\/\s.]|\d)+$/
export default {
  name: 'ContactUsForm',
  components: {
    ToggleButton,
    FadeIn,
    Uploader,
  },
  mixins: [validationMixin],

  props: {
    isInit: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    loading: false,
    numberMask,
    showErrorMessage: false,
    countries,
    openDropdown: false,
    formData: {
      file: null,
      firstName: '',
      email: '',
      phone: '',
      country: '',
      company: '',
      message: '',
      sendDNA: false,
      personalData: false,
    },
    errors: {
      firstName: '',
      email: '',
      country: '',
      phone: '',
    },
    isInitToggleButton: false,
    showSubmitButton: false,
    widthAnchor: 'auto',
    hasErrorFile: false,
    hasInitDropDown: false,
    formKey: 'key',
  }),
  validations() {
    return {
      formData: {
        email: { required, email },
        firstName: { required },
        country: { required },
        phone: { required },
      },
    }
  },
  computed: {
    ...mapGetters(['windowWidth']),
  },
  watch: {
    isInit() {
      this.init()
    },

    async windowWidth() {
      if (this.isInit) {
        this.formKey = `${this.windowWidth}`
        await this.$nextTick()
        this.init()
      }
    },
  },

  mounted() {
    this.init()
  },

  methods: {
    setHasErrorFile(hasErrorFile) {
      this.hasErrorFile = hasErrorFile
    },
    getFormData() {
      const formData = new FormData()
      const localData = { ...this.formData }
      if (!localData.file) delete localData.file

      Object.entries(localData).forEach(([key, value]) => {
        formData.append(key, value)
      })
      return formData
    },
    async submit() {
      // Test sending message to telegram
      this.loading = true
      try {
        await new Promise((resolve) => {
          setTimeout(async () => {
            if (this.hasErrorFile || (await this.validateForm())) {
              this.showErrorMessage = true
              resolve()
              return
            }
            // Try/Catch doesn't catch exception
            await this.$telegram
              .$post('/form', this.getFormData())
              .finally(() => {
                this.loading = false
              })
            resolve()
          }, 1000)
        })
      } catch (error) {
        this.$log.error(error)
      } finally {
        this.loading = false
      }
    },
    async validateForm() {
      this.$v.formData.$touch()
      await this.$nextTick()
      Object.keys(this.formData).forEach((key) => {
        this.setErrorByKey(key)
      })
      return this.$v.$invalid
    },
    init() {
      if (!this.isInit) return
      this.$refs['vt-text-field-0'].init()
      this.widthAnchor = `${this.$refs['vt-text-field-4'].$el.offsetWidth}px`
    },
    setErr() {
      if (this.errors.name) {
        this.errors.name = ''
      } else {
        this.errors.name = this.$t('contact-us-error-required-message')
      }
    },

    setErrorByKey(key) {
      const hasRequired = this.$v.formData[key]?.required !== undefined
      const hasEmail = this.$v.formData[key]?.email !== undefined

      if (hasRequired && !this.$v.formData[key]?.required) {
        this.errors[key] = this.$t('contact-us-error-required-message')
      } else if (hasEmail && !this.$v.formData[key]?.email) {
        this.errors[key] = this.$t('contact-us-error-email-message')
      } else {
        this.errors[key] = ''
      }
    },

    onInitTextField(numberElement) {
      // need for animation
      setTimeout(() => {
        if (numberElement === 3) {
          this.hasInitDropDown = true
          return
        }
        this.$refs[`vt-text-field-${numberElement}`].init()
        if (numberElement === 5) {
          this.isInitToggleButton = true
          setTimeout(() => {
            this.showSubmitButton = true
          }, 150)
        }
      }, 150)
    },
  },
}
</script>

<style lang="scss" scoped>
.contact-us-form {
  color: var(--white);
  @apply p-1;
}

.row {
  @apply flex flex-col;
  @apply md:flex-row md:gap-4;
}

.row__input {
  @apply mb-4 flex-1;
}
</style>
