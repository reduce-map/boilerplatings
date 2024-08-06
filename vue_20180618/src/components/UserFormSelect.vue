<template>
    <select
        :value="value"
        class="form-control"
        @input="select($event.target.value)">
        <option 
            v-for="item in list"
            :key="item"
            :value="item">
            {{ item }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'UserFormSelect',
    props: {
        value: {
            type: Number,
            required: true
        },
        list: {
            type: Array,
            default: () => [2, 5, 10]
        }
    },
    methods: {
        select(value) {
            this.$emit('input', value)
        }
    }
}
</script>
