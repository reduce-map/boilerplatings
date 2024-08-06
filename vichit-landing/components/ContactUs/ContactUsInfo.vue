<template>
  <div class="contact-info">
    <fade-in>
      <vt-heading v-show="isInit" :level="2">
        {{ $t('contact-us-info-header') }}
      </vt-heading>
    </fade-in>
    <fade-in>
      <p v-show="isInit" class="contact-info__subheading">
        {{ $t('contact-us-info-subheader') }}
      </p>
    </fade-in>
    <ul class="contacts-holder">
      <fade-in>
        <li v-show="isInit">
          <span class="icon-holder">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </span>

          <a href="mailto:hello@vichit.tech" target="_blank" class="capitalize">
            {{ $t('footer.email-us') }}
          </a>
        </li>
      </fade-in>
      <fade-in>
        <li v-show="isInit">
          <span class="icon-holder">
            <font-awesome-icon class="icon" :icon="['fas', 'mouse-pointer']" />
          </span>
          <a href="mailto:sales@vichit.tech" target="_blank" class="capitalize">
            {{ $t('footer.contact-sales') }}
          </a>
        </li>
      </fade-in>
    </ul>
  </div>
</template>

<script>
import FadeIn from '@/components/Transitions/fade-in'
export default {
  name: 'ContactUsInfo',
  components: {
    FadeIn,
  },
  props: {
    isInit: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.contact-info {
  color: var(--white);
}

.contact-info__subheading {
  @apply my-6 text-2xl;
}

.contacts-holder {
  li {
    @apply mb-2;
  }
  a:hover {
    text-decoration: underline;
  }
}

.icon-holder {
  min-width: 16px;
  margin-right: 6px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
}
</style>
