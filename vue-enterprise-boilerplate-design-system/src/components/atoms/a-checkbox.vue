<script>
import { Checkbox } from 'iview'
export default {
    name: 'ACheckbox',
    render(h) {
        const options = { on: this.$listeners, attrs: this.$attrs }
        const slots = [this.$slots.default]
        return h(Checkbox, options, slots)
    },
}
</script>
<docs>
This checkbox from iview https://www.iviewui.com/components/checkbox-en .

## Examples

Input usage

```jsx
    <a-checkbox
        :id="'exampleId'"
        :value="''"
        placeholder="example placeholder"
        :maxlength="5"
    />
```
</docs>
