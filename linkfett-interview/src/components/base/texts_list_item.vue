<template>
    <div>
        {{ number }}.
        {{ preview }}
        (created: {{ created | dayTime }})
    </div>
</template>

<script>
export default {
    name: 'TextsListItem',
    props: {
        number: {
            type: Number,
            required: true,
        },
        preview: {
            type: String,
            required: true,
        },
        created: {
            type: String,
            required: true,
        },
    },
}
</script>
