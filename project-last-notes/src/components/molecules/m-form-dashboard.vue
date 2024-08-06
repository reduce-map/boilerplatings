<template>
    <div class="m-form-credit-inquiry">
        <form @submit.prevent="onSubmit">
            <ASelect
                id="TaxID"
                :value="{
                    id: 0,
                    value: 'value',
                }"
                :options="[
                    {
                        id: 1,
                        value: 123,
                    },
                    {
                        id: 2,
                        value: 321,
                    },
                ]"
                :allow-empty="false"
                :show-labels="false"
                track-by="id"
                label="value"
            />
            <AInput>
                <span slot="prepend">http://</span>
                <span slot="append">.com</span>
            </AInput>
        </form>
    </div>
</template>

<script>
import ASelect from '@atoms/a-multiselect.vue'
import AInput from '@atoms/a-input.vue'

export default {
    name: 'FormDashboard',
    components: {
        ASelect,
        AInput,
    },
    data: () => ({
        localData: null,
    }),
    mounted() {
        // this.localData = { ...this.data }
    },
    methods: {
        onSubmit() {
            console.log('onSubmit')
        },
    },
}
</script>
