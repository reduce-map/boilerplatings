<template>
    <Upload class="app-upload" multiple type="drag" :action="action">
        <div class="img-holder">
            <img src="@assets/img-upload.png" alt="img-upload" />
        </div>
        <div class="text-holder">
            <p>Drag&Drop or <span class="yellow">Browse</span> to upload</p>
        </div>
    </Upload>
</template>

<script>
import { Upload } from 'view-design'

export default {
    name: 'MUpload',
    components: {
        Upload,
    },
    props: {
        action: {
            type: String,
            default: '//jsonplaceholder.typicode.com/posts/',
        },
    },
    methods: {
        onChange(value) {
            this.$emit('onChange', value)
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
