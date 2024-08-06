<template>
    <form @submit.prevent="onSubmit">
        <textarea v-model="text_new" type="text" />
        <input type="submit" :disabled="isLoading" value="Add text" />
        <span v-if="isLoading">Loading</span>
        <span> (more then) size: ({{ stringSize }}) </span>
        <button @click.prevent.stop="onAddMockText">
            Add mocked long text
        </button>
    </form>
</template>

<script>
import TextService from '@/services/text_service'
import Bytes from '@/utils/bytes'
import TextMock from '@/utils/text_mock'
import { mapActions } from 'vuex'

export default {
    name: 'FormAddText',
    data() {
        return {
            text_new: '',
            isLoading: false,
        }
    },
    computed: {
        stringSize: ({ text_new }) =>
            Bytes.bytesToSize(Bytes.byteCount(text_new)),
    },
    methods: {
        ...mapActions('text', ['getTextsList']),
        ...mapActions('notifications', ['setInfo']),
        async onSubmit() {
            const text = this.text_new

            if (text.length === 0) return

            this.isLoading = true

            try {
                const { id } = await TextService.saveText({
                    text,
                })
                // await this.getTextsList() // if need to update texts in store could be useful
                this.setInfo('Text was uploaded')
                this.$router.push({
                    name: 'Text',
                    params: { id },
                })
            } finally {
                this.isLoading = false
            }
        },
        onAddMockText() {
            this.text_new = TextMock.getMockText()
        },
    },
}
</script>

<style scoped>
textarea {
    display: block;
    width: 100%;
    min-height: 150px;
    max-height: 500px;
    margin: 0 0 5px;
}
button {
    cursor: pointer;
}
input[type='submit'] {
    width: 150px;
    height: 30px;
    cursor: pointer;
    background: red;
    outline: none;
}
form {
    margin: 0 0 10px;
}
</style>
