<template>
    <div>
        <div v-show="is_empty_sentences">
            There's no sentences. Loading...
        </div>
        <transition-group v-show="!is_empty_sentences" name="list" tag="ul">
            <li
                v-for="sentence in sentences"
                :id="sentence.sentence_id"
                :key="sentence.sentence_id"
                class="app-block app-block-clickable"
                :class="{
                    'app-item-active': id_active_text === sentence.sentence_id,
                    'app-item-sub-active':
                        anchor_sentence_id === sentence.sentence_id,
                }"
                @click="findSimilar(sentence)"
            >
                <texts-sentences-list-item
                    :sentence_id="sentence.sentence_id"
                    :sentence="sentence.sentence"
                />
            </li>
        </transition-group>
    </div>
</template>

<script>
import TextsSentencesListItem from '@/components/base/text_sentences_list_item.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'TextSentencesList',
    components: {
        TextsSentencesListItem,
    },
    data() {
        return {
            id_active_text: null,
            anchor_sentence_id: null,
        }
    },
    computed: {
        id: ({ $route }) => $route.params.id,
        ...mapGetters('text', ['sentences', 'is_empty_sentences']),
    },
    watch: {
        '$route.hash': {
            handler(hash) {
                // error handler if hash is not valid and validtion function for hash
                const _hash = parseInt(hash.replace('#', ''))

                if (_hash) {
                    this.anchor_sentence_id = _hash
                    // uncomment for search similar after hash changed
                    // this.findSimilar({
                    //     text_id: this.id,
                    //     sentence_id: _hash,
                    // })
                }
            },
            immediate: true,
        },
    },
    async created() {
        await this.getTextById({ id: this.id })
    },
    methods: {
        ...mapActions('text', ['findSimilarSentences', 'getTextById']),
        async findSimilar({ sentence_id }) {
            const isSameClicked = this.id_active_text === sentence_id
            if (isSameClicked) return // prevent same click on sentence

            await this.findSimilarSentences({
                text_id: this.id,
                sentence_id,
            })

            this.id_active_text = sentence_id
            this.anchor_sentence_id = null
        },
    },
}
</script>

<style lang="scss" scoped>
a {
    color: #000;
    text-decoration: none;
}
</style>
