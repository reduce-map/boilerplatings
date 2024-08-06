---
to: src/components/molecules/m-<%= name %>.vue
---
<template>
    <div class="$style.wrapper">
        {{ apifake }}

        <template v-if="isMatchesExist">
            <h3>No matches</h3>
                <p>
                    No hits have been found using your search criteria. Please try
                    the search again using different search criteria.
                </p>
        </template>
    </div>
</template>

<script>
import MAtom from '@atoms/a-atom.vue'

export default {
    name: 'M<%= Name %>',
    components: {
        MAtom,
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
        stateOption: {
            type: Array,
            required: true,
        },
        stateOption2: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        localData: null,
    }),
    mounted() {
        this.localData = { ...this.data }
    }
}
</script>

<style lang="scss" module>
@import '@design';

.wrapper {
    width: 887px;
    padding: 25px;
    margin: 0 auto;
    border: 1px solid #e9e9e7;
    border-radius: 10px;
    @extend %typography-small;
    padding: $size-button-padding;
    color: $color-button-text;
    background: $color-button-bg;
}
</style>
