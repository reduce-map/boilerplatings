<script>
import { DatePicker } from 'iview'
export default {
    render(h) {
        const options = { on: this.$listeners, attrs: this.$attrs }
        return h(DatePicker, options)
    },
}
</script>
