<template>
  <div
    class="
      image-card
      transition-all
      group
      rounded-lg
      relative
      flex flex-col
      md:flex-row md:items-center
    "
  >
    <div
      v-if="$slots.image"
      class="
        image-wrapper
        relative
        w-full
        max-h-80
        after:opacity-0
        md:flex-1 md:self-stretch md:max-h-[none]
        after:content-['']
        after:absolute
        after:inset-0
        after:transition-all
        after:duration-300
        group-hover:after:opacity-25
      "
    >
      <slot name="image" />
    </div>
    <div
      v-if="$slots.image"
      class="
        relative
        image-card__img-content
        rounded-t-lg
        md:rounded-t-none md:rounded-l-lg md:flex-1
        lg:flex-[2]
        md:self-stretch
      "
    >
      <div class="text-lg text-center font-medium my-5 md:text-xl">
        <slot name="title" />
      </div>
      <div class="image-card__content pl-4 pr-8 pb-4 md:pl-5 md:pr-8 md:pb-5">
        <slot />
      </div>
      <div class="flex justify-between">
        <div class="flex-1 border-t p-4 pr-8 md:p-5 md:pr-8">
          <slot name="footer-content" />
        </div>
        <button
          class="
            btn-footer
            flex
            justify-center
            items-center
            relative
            transition-transform
            duration-300
            border-l border-t
            rounded-br-lg
            w-20
            before:content-['']
            before:absolute
            before:inset-0
            before:transition-transform
            before:duration-300
            before:origin-[center_right]
            before:scale-x-0
            before:z-[-1]
            group-hover:before:scale-x-100
            group-hover:before:origin-[center_left]
          "
        >
          <!-- <slot name="footer-button" /> -->
          <arrow-left class="w-8 h-8 arrow-rotate-right" />
        </button>
      </div>
    </div>
    <div
      v-else
      class="
        relative
        image-card__img-content
        rounded-t-lg
        md:rounded-t-none md:rounded-l-lg md:flex-1
        lg:flex-[2]
        md:self-stretch
      "
      :class="{
        'flex flex-col justify-between': !$slots.image,
      }"
    >
      <div class="text-lg text-center font-medium my-5 md:text-xl">
        <slot name="title" />
      </div>
      <div class="image-card__content pl-4 pr-8 pb-4 md:pl-5 md:pr-8 md:pb-5">
        <slot />
      </div>
      <div class="flex justify-between">
        <div class="flex-1 border-t p-4 pr-8 md:p-5 md:pr-8">
          <slot name="footer-content" />
        </div>
        <!--        <nuxt-link :to="localePath(link)">-->
        <vt-gradient-button class="btn-gradient">
          <template #icon>
            <font-awesome-icon
              class="icon"
              :icon="['fas', 'long-arrow-alt-right']"
            />
          </template>
        </vt-gradient-button>
        <!--        </nuxt-link>-->
      </div>
    </div>
    <!--    <nuxt-link :to="localePath(link)" class="link-overflow">-->
    <!--      <slot name="overflow-link-content"></slot>-->
    <!--    </nuxt-link>-->
  </div>
</template>

<script>
export default {
  name: 'VtCardImage',
  props: {
    link: {
      type: String,
      default: 'index',
    },
  },
}
</script>

<style lang="scss" scoped>
.image-card {
  box-shadow: 0 2px 21px 0 rgb(0 0 0 / 10%);
  border: 1px solid rgba(0, 0, 0, 0.2);

  .icon {
    color: var(--vichit-orange-harley);
  }

  //.btn-footer:focus-visible,
  &:hover .btn-footer,
  .btn-footer:active {
    ::v-deep {
      .button-icon {
        transform: scale(0.9);
      }
    }

    &:before {
      transform: scaleX(1);
      transform-origin: center left;
    }
  }
  .btn-footer {
    height: 100%;
    border-radius: 0;
    border-bottom-right-radius: 0.5rem;
  }

  .btn-gradient {
    @apply border-t px-5;
    height: 100%;
    border-radius: 0;
    border-bottom-right-radius: 0.5rem;

    &::before {
      border-radius: 0;
      border-bottom-right-radius: 0.5rem;
    }
  }

  &:hover {
    .icon {
      color: var(--vichit-snow);
    }
    .btn-gradient {
      &::before {
        transform: scaleX(1);
        transform-origin: center left;
      }
    }
  }
}

.image-wrapper {
  * {
    @apply w-full h-full object-cover rounded-t-lg max-h-80;
    @apply md:flex-1 md:self-stretch md:max-w-none md:rounded-t-none md:rounded-l-lg md:max-h-[none];
  }

  &:after {
    background-color: #221e1e;
  }
}

.link-overflow {
  text-indent: -9999px;
  font-size: 0;
  line-height: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.arrow-rotate-right {
  transform: rotate(180deg);
}
</style>
