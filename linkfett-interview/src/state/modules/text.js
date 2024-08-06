import TextService from '@/services/text_service'
import _ from 'lodash'

function compare(a, b) {
    if (a.similarity < b.similarity) {
        return 1
    }
    if (a.similarity > b.similarity) {
        return -1
    }
    return 0
}

export const state = {
    texts_list: [],
    sentences: [],
    similar_sentences: [],
    // cached_similar_sentences - could be add here in future
    // cached texts_by_id - could be add here in future
    // is loading state for components - could be add here in future
}

export const mutations = {
    SET_SIMILAR_SENTENCES(state, similar_sentences) {
        state.similar_sentences = similar_sentences
    },
    SET_SENTENCES(state, sentences) {
        state.sentences = sentences
    },
    SET_TEXTS_LIST(state, texts_list) {
        state.texts_list = texts_list
    },
    RESET_SENTENCES(state) {
        state.sentences = []
    },
    RESET_SIMILAR_SENTENCES(state) {
        state.similar_sentences = []
    },
}

export const getters = {
    sentences: state => state.sentences,
    is_empty_sentences: state => state.sentences.length === 0,
    texts_list: state => state.texts_list,
    is_empty_texts_list: state => state.texts_list.length === 0,
    similar_sentences: state => state.similar_sentences,
    similar_sentences_sorted: state => {
        let _similar_sentences = [...state.similar_sentences]

        // remove duplicates from array with the same sentence_id
        _similar_sentences = _.uniqBy(_similar_sentences, el => el.sentence_id)

        return _similar_sentences.sort(compare)
    },
    is_empty_similar_sentences: ({ similar_sentences }) =>
        similar_sentences.length === 0,
}

export const actions = {
    async findSimilarSentences({ commit }, { text_id, sentence_id }) {
        const { similar_sentences } = await TextService.findSimilarSentences(
            text_id,
            sentence_id
        )
        commit('SET_SIMILAR_SENTENCES', similar_sentences)
    },
    async getTextById({ commit }, { id }) {
        const { sentences } = await TextService.getTextById(id)
        commit('SET_SENTENCES', sentences)
    },
    resetSentencesAndSimilarSentences({ commit }) {
        commit('RESET_SIMILAR_SENTENCES')
        commit('RESET_SENTENCES')
    },
    async getTextsList({ commit }) {
        const { texts } = await TextService.getListTexts()
        commit('SET_TEXTS_LIST', texts)
    },
}
