<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
    name: 'VeeValidate',
    props: {
        nameValidate: {
            type: String,
            default: 'provider',
        },
    },
    render(h) {
        const isObserver = this.nameValidate === 'observer'
        return h(isObserver ? ValidationObserver : ValidationProvider, {
            attrs: this.$attrs,
            scopedSlots: {
                default: props => this.$scopedSlots.default({ ...props }),
            },
        })
    },
}
</script>
