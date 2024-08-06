import ImageService from '@/services/image-service'

export const state = {
    images: {},
    imagesDetails: {},

    // request information data
    pageCount: null,
    hasMore: null,
    page: 0,

    // cached_similar_sentences - could be add here in future
    // cached texts_by_id - could be add here in future
    // is loading state for components - could be add here in future
}

export const mutations = {
    SET_IMAGES(state, { pictures, page, pageCount, hasMore }) {
        const newImages = {}
        newImages[page] = pictures

        state.images = {
            ...state.images,
            ...newImages,
        }
        state.pageCount = pageCount
        state.hasMore = hasMore
        state.page = page
    },
    SET_IMAGE_DETAILS(state, data) {
        const newImageDetails = {}
        newImageDetails[data.id] = data
        state.imagesDetails = {
            ...state.imagesDetails,
            ...newImageDetails,
        }
    },
}

export const getters = {
    images: state => state.images,
    getNextPage: state => state.page + 1,
    hasMore: state => state.hasMore,
    imagesList: state => Object.values(state.images).flat(),
    findImageById: (state, getters) => id =>
        getters.imagesList.find(el => el.id === id),
    findImageIndexById: (state, getters) => id =>
        getters.imagesList.indexOf(getters.findImageById(id)),
    findImageIdByIndex: (state, getters) => index =>
        getters.imagesList[index] ? getters.imagesList[index].id : null,
    getImageDetails: state => id => state.imagesDetails[id],
}

export const actions = {
    async getImages({ commit, getters }) {
        const data = await ImageService.getImages({
            page: getters.getNextPage,
        })
        commit('SET_IMAGES', data)
    },
    async getImageDetails({ commit, getters }, id) {
        // return cached data
        if (getters.getImageDetails(id)) {
            return getters.getImageDetails(id)
        }

        const data = await ImageService.getImageDetails(id)
        commit('SET_IMAGE_DETAILS', data)
        return data
    },
    async getNextImageDetails({ commit, getters, dispatch }, id) {
        let nextId = getters.findImageIdByIndex(
            getters.findImageIndexById(id) + 1
        )

        if (!nextId) {
            if (getters.hasMore) {
                await dispatch('getImages')
                nextId = getters.findImageIdByIndex(
                    getters.findImageIndexById(id) + 1
                )
            }
        }

        const data = await ImageService.getImageDetails(nextId)
        commit('SET_IMAGE_DETAILS', data)
        return data
    },
    async getPrevImageDetails({ commit, getters }, id) {
        const prevId = getters.findImageIdByIndex(
            getters.findImageIndexById(id) - 1
        )

        if (!prevId) return null

        const data = await ImageService.getImageDetails(prevId)
        commit('SET_IMAGE_DETAILS', data)
        return data
    },
}
