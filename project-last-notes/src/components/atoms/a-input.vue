<script>
import { Input } from 'iview'
export default {
    name: 'AInput',
    render(h) {
        const options = { on: this.$listeners, attrs: this.$attrs }
        const slots = Object.keys(this.$slots).map(nameSlot =>
            h('template', { slot: `${nameSlot}` }, [
                h('slot', { name: `${nameSlot}` }, this.$slots[`${nameSlot}`]),
            ])
        )
        return h(Input, options, slots)
    },
}
</script>

<style>
@import '~iview/dist/styles/iview.css';
</style>

<docs>
This input from iview https://www.iviewui.com/components/input .

## Examples

Input usage

```jsx
<a-input>
    <span slot="prepend">http://</span>
    <span slot="append">.com</span>
</a-input>
```
</docs>
