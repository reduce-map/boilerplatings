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


<docs>
This input from iview https://www.iviewui.com/components/input .

## Examples

Input usage

```jsx
    <a-input
        :id="'exampleId'"
        :value="''"
        placeholder="example placeholder"
        :maxlength="5"
    />
```
</docs>
