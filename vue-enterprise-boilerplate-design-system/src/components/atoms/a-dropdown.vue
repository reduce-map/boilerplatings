<script>
import Dropdown from 'bp-vuejs-dropdown'
export default {
    render(h) {
        const options = { on: this.$listeners, attrs: this.$attrs }
        const slots = Object.keys(this.$slots).map(nameSlot =>
            h('template', { slot: `${nameSlot}` }, [
                h('slot', { name: `${nameSlot}` }, this.$slots[`${nameSlot}`]),
            ])
        )
        return h(Dropdown, options, slots)
    },
}
</script>
