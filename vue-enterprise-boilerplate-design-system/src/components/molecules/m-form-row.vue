<script>
import AInput from '@atoms/a-input.vue'
import ALabel from '@atoms/a-label.vue'
import _ from 'underscore'
export default {
    name: 'MFormRow',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        labelFor: {
            type: String,
            required: true,
        },
        labelText: {
            type: String,
            required: true,
        },
        maxLength: {
            type: [Number, String],
            default: 50,
        },
        typeInput: {
            type: String,
            default: 'text',
        },
    },
    computed: {
        inputOptions() {
            return {
                attrs: this.inputAttrs,
                on: this.inputListeners,
            }
        },
        inputListeners() {
            return { input: valueData => this.$emit('input', valueData) }
        },
        inputAttrs() {
            return {
                'element-id': this.labelFor,
                type: this.typeInput,
                maxlength: this.maxLength,
                value: this.value,
            }
        },
    },
    methods: {
        children: (slotDefault, input) =>
            _.isUndefined(slotDefault) ? input : slotDefault,
    },
    render(h) {
        const slotDefault = this.$slots.default
        const input = h(AInput, this.inputOptions)
        return h('div', { class: 'form-row' }, [
            h(
                ALabel,
                { attrs: { for: this.labelFor, required: this.required } },
                [this.labelText]
            ),
            this.children(slotDefault, input),
        ])
    },
}
</script>
<docs>
This row is amazing, use it responsibly.

## Examples

m-form-row:

```js
new Vue({
    data(){
        return {
            companyName: ' '
        }
    },
    template:
        `
            <div>
                <div>
                    result {{ companyName }}
                </div>
                <m-form-row
                    v-model="companyName"
                    :label-for="'Website'"
                    :label-text="'Website'"
                    :max-length=100
                />
            </div>
        `
    })
```
</docs>
