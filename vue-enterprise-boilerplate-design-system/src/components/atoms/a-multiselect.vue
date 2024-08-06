
<script>
import Multiselect from 'vue-multiselect'
export default {
    render(h) {
        return h(Multiselect, { on: this.$listeners, attrs: this.$attrs })
    },
}
</script>

<docs>
This select is amazing, use it responsibly. (go to https://vue-multiselect.js.org/)

## Examples

Label usage

```jsx
<a-select
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
</docs>-->
