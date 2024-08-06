---
to: src/components/organisms/o-<%= name %>.vue
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
import MMolecule from '@molecules/m-molecule.vue'
import axios from 'axios'

export default {
    name: 'O<%= Name %>',
    components: {
        MMolecule,
    },
    data: () => ({
        apifake: null,
    }),
    computed: {
        isMatchesExist() {
            return false
        },
    },
    mounted() {
        this.loadData()
    },
    methods: {
        onSearch(data) {
            console.log('onSearch', data)
        },
        loadData() {
            axios.get('/api/fake').then(data => {
                console.log(data)
                this.apifake = data
            })
        },
    },
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
