<template>
<validate
    v-bind="$attrs"
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
    name: 'ValidateRequire',
    components: {
        validate,
    },
    props: {
        required: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        rules() {
            return this.required ? 'required' : ''
        },
    },
}
</script>
