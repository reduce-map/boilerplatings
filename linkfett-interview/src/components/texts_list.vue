<template>
    <div>
        <h1>Texts:</h1>

        <div v-if="is_empty_texts_list">
            There's no texts. Loading...
        </div>
        <ul v-else>
            <li
                v-for="(text, index) in texts_list"
                :key="text.id"
                class="app-block app-block-clickable"
                @click="onTextClick(text)"
            >
                <texts-list-item
                    :number="index + 1"
                    :preview="text.preview"
                    :created="text.created"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TextsListItem from '@/components/base/texts_list_item.vue'

export default {
    name: 'TextsList',
    components: {
        TextsListItem,
    },
    computed: {
        ...mapGetters('text', ['texts_list', 'is_empty_texts_list']),
    },
    async mounted() {
        await this.getTextsList()
    },
    methods: {
        ...mapActions('text', [
            'getTextsList',
            'resetSentencesAndSimilarSentences',
        ]),
        onTextClick({ id }) {
            this.resetSentencesAndSimilarSentences()
            this.$router.push({
                name: 'Text',
                params: { id },
            })
        },
    },
}
</script>
