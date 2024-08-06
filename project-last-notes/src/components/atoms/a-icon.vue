<script>
export default {
    name: 'AImg',
    render(h) {
        const options = {
            class: [
                this.$attrs.classMaterialDesign || 'material-icons',
                'a-icon',
            ],
            on: this.$listeners,
        }
        const child = this.$attrs['text-icon'] || ''
        return h('i', options, child)
    },
}
</script>
