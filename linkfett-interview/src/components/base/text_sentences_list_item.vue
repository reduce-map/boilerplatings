<template>
    <div>
        {{ sentence_id }}.
        {{ sentence }}
    </div>
</template>

<script>
export default {
    name: 'TextSentencesListItem',
    props: {
        sentence_id: {
            type: Number,
            required: true,
        },
        sentence: {
            type: String,
            required: true,
        },
    },
}
</script>
