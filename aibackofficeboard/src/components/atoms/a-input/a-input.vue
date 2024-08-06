<template>
    <div class="a-input">
        <template v-if="label">
            <span class="label">
                {{ label }}
            </span>
        </template>

        <template v-if="validation">
            <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                :name="validationConfig.name"
                :rules="validationConfig.rules"
                mode="eager"
            >
                <Input
                    v-model="localValue"
                    :class="{
                        'has-errors shake animated': errors.length > 0,
                    }"
                    v-bind="$attrs"
                />
                <span v-if="errors.length > 0" class="error">{{
                    errors[0]
                }}</span>
            </ValidationProvider>
        </template>
        <template v-else>
            <Input v-model="localValue" v-bind="$attrs" />
        </template>
    </div>
</template>

<script>
import { Input } from 'view-design'
import { ValidationProvider } from 'vee-validate'

export default {
    name: 'AInput',
    components: {
        Input,
        ValidationProvider,
    },
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
        validation: {
            type: Boolean,
            default: false,
        },
        validationConfig: {
            type: Object,
            default: () => {},
        },
        label: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        localValue: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            },
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
