<template>
    <div>
        <input
            :value="picture"
            type="text"
            class="form-control"
            @input="$emit('input', $event.target.value)">

        <input
            ref="avatar"
            type="file"
            class="hidden"
            @change="upload">
        <button
            type="button"
            class="btn btn-primary"
            @click="selectImage">
            Load new ava
        </button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AvatarUploader',
    model: {
        prop: 'picture'
    },
    props: {
        picture: {
            type: String,
            required: true
        }
    },
    methods: {
        upload() {
            const imgurUrl = 'https://api.imgur.com/3/image'
            const clientId = '33d12ba8febcad6'
            const data = new FormData()
            data.append('image', this.$refs.avatar.files[0])

            axios
                .post(imgurUrl, data, {
                    headers: {
                        Authorization: `Client-ID ${clientId}`
                    }
                })
                .then(({ data: { data: imageData } }) => {
                    this.$refs.avatar.value = ''
                    this.$emit('input', imageData.link)
                })
        },
        selectImage() {
            this.$refs.avatar.click()
        }
    }
}
</script>
