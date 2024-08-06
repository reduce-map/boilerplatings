<template>
    <div class="text-sentences">
        <button class="app-btn" @click="$router.push({ name: 'Home' })">
            ← Back
        </button>
        <div class="app-columns-holder">
            <text-sentences-list class="app-column" />
            <similar-sentences-list class="app-column app-column-fixed" />
        </div>
    </div>
</template>

<script>
import TextSentencesList from '@/components/text_sentences_list.vue'
import SimilarSentencesList from '@/components/similar_sentences_list.vue'

export default {
    name: 'TextPage',
    components: {
        TextSentencesList,
        SimilarSentencesList,
    },
}
</script>
