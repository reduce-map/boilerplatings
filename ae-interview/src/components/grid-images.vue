<template>
    <div>
        <modal width="900px" height="auto" name="image-modal">
            <image-modal v-if="imageId" :id="imageId" />
        </modal>
        <h1>
            Photos
        </h1>
        <div class="grid-images-holder">
            <image-holder
                v-for="image in imagesList"
                :key="image.id"
                class="grid-element"
                :src="image.cropped_picture"
                @click.native="onImageClick(image.id)"
            />
            <infinite-loading @infinite="infiniteHandler" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import ImageHolder from '@/components/base/image-holder.vue'
import ImageModal from '@/components/image-modal.vue'

export default {
    name: 'GridImages',
    components: {
        ImageHolder,
        InfiniteLoading,
        ImageModal,
    },
    data() {
        return {
            imageId: null,
        }
    },
    computed: {
        ...mapGetters('images', ['images', 'hasMore', 'imagesList']),
    },
    methods: {
        ...mapActions('images', ['getImages']),
        async infiniteHandler($state) {
            await this.getImages()

            if (this.hasMore) {
                $state.loaded()
            } else {
                $state.complete()
            }
        },
        async onImageClick(id) {
            this.imageId = id
            this.$modal.show('image-modal')
        },
    },
}
</script>

<style scoped>
.grid-images-holder {
    column-width: 300px;
    column-gap: 15px;
}
.grid-element {
    display: inline-block;
    width: 300px;
    padding: 15px;
    margin: 0 10px 15px;
    cursor: pointer;
    background: #fefefe;
    border: 2px solid #fcfcfc;
    box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4);
}
.grid-images-holder:hover .grid-element:not(:hover) {
    opacity: 0.4;
}

@media screen and (max-width: 750px) {
    .grid-images-holder {
        column-gap: 0;
    }
}
</style>
