<template>
    <div class="form-row">
        <ALabel :required="required" :for="labelFor"> {{ labelText }} </ALabel>

        <slot>
            <AInput
                :id="labelFor"
                :value="localValue"
                :maxlength="maxLength"
                @input="onInput"
            />
        </slot>
    </div>
</template>

<script>
import AInput from '@atoms/a-input.vue'
import ALabel from '@atoms/a-label.vue'

export default {
    name: 'MFormRow',
    components: {
        AInput,
        ALabel,
    },

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
    },

    data: () => ({
        localValue: null,
    }),
    watch: {
        localData: {
            handler(value) {
                this.$emit('input', value)
            },
        },
    },
    mounted() {
        this.localValue = this.value
    },
    methods: {
        onInput(value) {
            this.localValue = value
            this.$emit('input', value)
        },
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
