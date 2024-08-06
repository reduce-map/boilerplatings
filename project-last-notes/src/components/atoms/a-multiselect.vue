<script>
import Multiselect from 'vue-multiselect'
export default {
    name: 'AMultiselect',
    render(h) {
        const options = { on: this.$listeners, attrs: this.$attrs }
        const slots = Object.keys(this.$slots).map(nameSlot =>
            h('template', { slot: `${nameSlot}` }, [
                h('slot', { name: `${nameSlot}` }, this.$slots[`${nameSlot}`]),
            ])
        )
        return h(Multiselect, options, slots)
    },
}
</script>

<style>
@import '~vue-multiselect/dist/vue-multiselect.min.css';
</style>

<docs>
This select is amazing, use it responsibly. (go to https://vue-multiselect.js.org/)

## Examples

Label usage

```jsx
<a-multiselect
    id="TaxID"
    :value="{
        id: 0,
        value: 'value'
    }"
    :options="[
        {
            id: 1,
            value: 123
        },
        {
            id: 2,
            value: 321
        }
    ]"
    :allow-empty="false"
    :show-labels="false"

    track-by="id"
    label="value"
/>
```
</docs>
