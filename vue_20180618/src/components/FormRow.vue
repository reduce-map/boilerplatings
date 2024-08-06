<template>
    <div class="col-md-6 mb-3">
        <label :for="data.type">{{ data.label }} </label>
        <input 
            :type="inputType"
            :value="data.value"
            :id="data.type"
            class="form-control"
            @input="onInput">
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        inputType() {
            return this.data.inputType ? this.data.inputType : 'text'
        }
    },
    methods: {
        onInput(evt) {
            this.$emit('onInput', { ...this.data, ...{ value: evt.target.value } })
        }
    }
}
</script>
