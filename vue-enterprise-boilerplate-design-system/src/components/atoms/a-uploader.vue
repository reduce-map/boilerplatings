<script>
export default {
    name: 'Uploader',
    render(h) {
        const inputOptions = {
            class: 'hidden',
            ref: 'file',
            attrs: { type: 'file' },
            on: {
                input: () => this.$emit('input', this.$refs.file.files[0]),
            },
        }
        const children = [
            h('input', inputOptions),
            this.$scopedSlots.default(this.$refs),
        ]
        return h('div', children)
    },
}
</script>
<style>
.hidden {
    display: none;
}
</style>
