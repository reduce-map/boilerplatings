<script>
import { Divider } from 'iview'
export default {
    render(h) {
        const options = { attrs: this.$attrs }
        const slots = [this.$slots.default]
        return h(Divider, options, slots)
    },
}
</script>
