<template>
    <div>
        <input
            ref="datepicker"
            :value="value"
            type="text"
            class="form-control">
    </div>
</template>

<script>
import Flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

export default {
    name: 'Datepicker',
    fp: null,
    props: {
        value: {
            type: String,
            required: true
        }
    },
    watch: {
        value: 'updateDatepicker'
    },
    mounted() {
        this.$options.fp = Flatpickr(this.$refs.datepicker, {
            dateFormat: 'm.d.Y',
            onChange: (_, dateStr) => this.$emit('input', dateStr)
        })
    },
    beforeDestroy() {
        this.$options.fp.destroy()
    },
    methods: {
        updateDatepicker() {
            this.$options.fp.setDate(this.value)
        }
    }
}
</script>
