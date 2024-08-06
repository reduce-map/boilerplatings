<template>
    <swiper
        ref="mySwiper"
        class="wrap"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <swiper-slide
            v-for="(image, index) in images"
            :key="image + index"
        >
            <img
                class="swiper-image"
                :src="image"
                alt="Image"
            >
        </swiper-slide>

        <template slot="button-next">
            <slot name="button-next">
                <div
                    class="swiper-button-next"
                    @click="swiper.slideNext()"
                />
            </slot>
        </template>

        <template slot="button-prev">
            <slot name="button-prev">
                <div
                    class="swiper-button-prev"
                    @click="swiper.slidePrev()"
                />
            </slot>
        </template>

        <template slot="pagination">
            <slot name="pagination">
                <div class="swiper-pagination" />
            </slot>
        </template>

        <template slot="scrollbar">
            <slot name="scrollbar">
                <div class="swiper-scrollbar" />
            </slot>
        </template>
    </swiper>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    components: {
        swiper,
        'swiper-slide': swiperSlide,
    },
    props: {
        images: {
            type: Array,
            required: true,
        },
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        },
    },
}
</script>
