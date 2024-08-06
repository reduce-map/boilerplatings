<template>
    <div ref="charts" />
</template>

<script>
import $ from 'jquery'
import '@progress/kendo-ui'
import _ from 'underscore'
import lodash from 'lodash'

export default {
    name: 'AKendoChart',
    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        const refsChart = this.$refs.charts

        $(refsChart).kendoChart({
            ...this.createCamelCaseAttrs(this.$attrs),
        })
        this.chart = $(refsChart).data('kendoChart')
        this.$emit('initChart', this.chart)
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
        this.chart.destroy()
    },
    methods: {
        handleResize() {
            this.chart.refresh()
        },
        createCamelCaseAttrs(attrs) {
            return _.keys(attrs).reduce((prev, cur) => {
                prev[lodash.camelCase(cur)] = attrs[cur]
                return prev
            }, {})
        },
    },
}
</script>
