<template>
    <uploader @input="onGetFile">
        <button
            slot-scope="{file}"
            type="button"
            @click="file.click()"
        >
            Upload new avatar
        </button>
    </uploader>
</template>

<script>
import axios from 'axios'
import Uploader from '@atoms/a-uploader.vue'
export default {
    components: {
        uploader: Uploader,
    },
    methods: {
        // TODO перенести на топ уровень!!!
        onGetFile(file) {
            const url = 'https://api.imgur.com/3/image'
            const data = new FormData()
            data.set('image', file)

            const config = {
                headers: {
                    Authorization: 'Client-ID 67580e34f4c12e8',
                },
            }
            axios
                .post(url, data, config)
                .then(response => response.data)
                .then(response => {
                    this.$emit('input', response.data.link)
                })
        },
    },
}
</script>
