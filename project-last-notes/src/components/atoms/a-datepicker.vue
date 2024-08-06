<script>
import { DatePicker } from 'iview'
import { locale } from 'iview'
import lang from 'iview/dist/locale/en-US'

locale(lang)

export default {
    name: 'ADatepicker',
    render(h) {
        const options = { on: this.$listeners, attrs: this.$attrs }
        return h(DatePicker, options)
    },
}
</script>

<docs>
This checkbox from iview https://www.iviewui.com/components/checkbox-en .

## Examples

Basic Usage

```jsx
<a-datepicker
    type="date"
    placeholder="Select date"
/>
```

Daterange

```jsx
<a-datepicker
    type="daterange"
    placement="bottom-end"
    placeholder="Select date"
/>
```
</docs>
