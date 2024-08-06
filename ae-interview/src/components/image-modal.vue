<template>
    <div class="image-modal-holder">
        <button
            :disabled="isPrevDisabled"
            class="btn-prev"
            @click="onPrevClick"
        >
            ←
        </button>
        <button
            :disabled="isNextDisabled"
            class="btn-next"
            @click="onNextClick"
        >
            →
        </button>
        <template v-if="details">
            <v-zoomer
                style="width: 100%; height: 80%; border: solid 1px silver;"
            >
                <img
                    :src="details.full_picture"
                    style="object-fit: contain; width: 100%; height: 100%;"
                />
            </v-zoomer>

            <div class="details-holder">
                <p>Author: {{ details.author }}</p>
                <p>Camera: {{ details.camera }}</p>
                <p>
                    Tags:
                    <span
                        v-for="tag in details.tags.split(' ')"
                        :key="tag"
                        class="tag"
                    >
                        {{ tag }}
                    </span>
                </p>
            </div>
        </template>
        <div v-else>
            Loading
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ImageViewer',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            details: null,
            isPrevDisabled: false,
            isNextDisabled: false,
        }
    },
    async mounted() {
        await this.fetch()
    },
    methods: {
        ...mapActions('images', [
            'getImageDetails',
            'getNextImageDetails',
            'getPrevImageDetails',
        ]),
        async fetch() {
            this.details = await this.getImageDetails(this.id)
        },
        async onNextClick() {
            const data = await this.getNextImageDetails(this.details.id)
            if (!data) return (this.isNextDisabled = true)
            this.details = data
            this.isPrevDisabled = false
        },
        async onPrevClick() {
            const data = await this.getPrevImageDetails(this.details.id)
            if (!data) return (this.isPrevDisabled = true)
            this.details = data
            this.isNextDisabled = false
        },
    },
}
</script>

<style class="scoped">
.image-holder {
    width: 800px;
    padding: 20px 0;
    margin: 0 auto;
}

.details-holder {
    position: absolute;
    top: 40px;
    left: 120px;
    max-width: 400px;
    padding: 4px;
    color: #fff;
    background: rgb(0, 0, 0, 0.8);
}

.btn-prev,
.btn-next {
    position: absolute;
    top: 50%;
    right: 10px;
    z-index: 2016;
}
.btn-prev {
    right: auto;
    left: 10px;
}
</style>
