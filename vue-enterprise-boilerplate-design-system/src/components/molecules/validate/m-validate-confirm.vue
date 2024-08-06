<template>
<validate
    :rules="rules"
>
    <div slot-scope="{ errors }">
        <slot name="valid" />
        <slot
            name="errors"
            :errors="errors"
        >
            <span
                slot="errors"
            >
                {{ errors[0] }}
            </span>
        </slot>
    </div>
</validate>
</template>
<script>
import validate from '@atoms/a-vee-validate.vue'
export default {
    name: 'ValidateRequir',
    components: {
        validate,
    },
    props: {
        confirmed: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        rules() {
            return this.required
                ? `required|confirmed:${this.confirmed}`
                : `confirmed:${this.confirmed}`
        },
    },
}
</script>
