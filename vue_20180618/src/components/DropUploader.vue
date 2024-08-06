<template>
    <div>
        <vue-dropzone
            id="dropzone"
            :options="dropzoneOptions"
            @vdropzone-success="successUpload"/>
    </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
    name: 'DropUploader',
    components: {
        vueDropzone: vue2Dropzone
    },
    data: function() {
        return {
            dropzoneOptions: {
                paramName: 'image',
                acceptedFiles: 'image/*',
                method: 'post',
                createImageThumbnails: false,
                url: 'https://api.imgur.com/3/image',
                headers: {
                    'Cache-Control': null,
                    'X-Requested-With': null,
                    Authorization: `Client-ID 33d12ba8febcad6`
                }
            }
        }
    },
    methods: {
        successUpload(file, resp) {
            this.$emit('fileUploaded', resp.data.link)
        }
    }
}
</script>
