<script>
export default {
    name: 'AImg',
    render(h) {
        const options = { on: this.$listeners, attrs: this.$attrs }
        return h('img', options)
    },
}
</script>
