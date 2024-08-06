<template>
    <div class="simmilar-sentences">
        <div v-show="is_empty_similar_sentences">
            There're no similar sentences
        </div>
        <transition-group
            v-show="!is_empty_similar_sentences"
            name="list"
            tag="ul"
        >
            <li
                v-for="sentence in similar_sentences_sorted"
                :key="sentence.sentence_id"
                class="list-item app-block app-block-clickable"
            >
                {{ sentence.sentence }}
                (similarity: {{ sentence.similarity | percentage }})

                <template v-if="isTheSameRoute(sentence)">
                    <a
                        :href="getAnchorLinkUrl(sentence)"
                        @click="onAnchorClick(sentence)"
                    >
                        scroll to {{ sentence.sentence_id }}
                    </a>
                </template>
                <template v-else>
                    <!-- open in new window could be useful -->
                    <!-- target="_blank"
                    :href="getLinkUrl(sentence)"  -->
                    <a
                        :href="getAnchorLinkUrl(sentence)"
                        @click="onSimilarSentenceLinkClick(sentence)"
                    >
                        link to the text
                    </a>
                </template>
            </li>
        </transition-group>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'SimilarSentencesList',
    data() {
        return {
            anchor_sentence_id: null,
            similar_sentences: [],
        }
    },
    computed: {
        ...mapGetters('text', [
            'similar_sentences_sorted',
            'is_empty_similar_sentences',
        ]),
        id: ({ $route }) => $route.params.id,
        isTheSameRoute: ({ id }) => ({ text_id }) => id === text_id,
    },
    methods: {
        ...mapActions('text', ['resetSentencesAndSimilarSentences']),
        getLinkUrl({ text_id }) {
            return `/text/${text_id}`
        },
        getAnchorLinkUrl({ sentence_id }) {
            return `#${sentence_id}`
        },
        onAnchorClick({ sentence_id }) {
            this.anchor_sentence_id = sentence_id
        },
        onSimilarSentenceLinkClick({ text_id }) {
            this.resetSentencesAndSimilarSentences()
            this.$router.push({
                name: 'Text',
                params: { id: text_id },
            })
        },
    },
}
</script>
