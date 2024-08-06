<template>
    <KendoChart
        :series-click="seriesClick"
        :legend-item-click="legendItemClick"
        :series-defaults="seriesDefaults"
        :series-colors="seriesColors"
        @initChart="initChart"
    />
</template>

<script>
import KendoChart from '@atoms/a-kendo-chart.vue'

export default {
    name: 'MChartKendoPie',
    components: {
        KendoChart,
    },
    props: {
        options: {
            type: [Object],
            required: true,
        },
    },
    data() {
        return {
            chart: null,
            seriesDefaults: {
                type: 'pie',
                labels: {
                    visible: true,
                    format: '{0}%',
                    position: 'center',
                },
            },
            seriesColors: ['#03a9f4', '#ff9800', '#fad84a', '#4caf50'],
        }
    },
    methods: {
        initChart(chart) {
            this.$watch('options', this.setOptions, { deep: true })
            this.chart = chart
            this.setOptions()
        },
        seriesClick(e) {
            const seriesIndex = e.point.index
            const element = this.seriesData(e)[seriesIndex]
            this.setExplode(this.seriesData(e), element, element.explode)
            this.$emit('seriesClick', e)
            this.refreshEmit(e)
        },

        legendItemClick(e) {
            const seriesIndex = e.pointIndex
            const element = this.seriesData(e)[seriesIndex]
            this.setExplode(this.seriesData(e), element, element.explode)
            this.$emit('legendItemClick', e)
            this.refreshEmit(e)
        },
        seriesData: e => e.series.data,

        setExplode(seriesData, element, elementExplode) {
            !elementExplode &&
                seriesData.forEach(el => (el.explode = elementExplode))
            element.explode = !elementExplode
        },
        refreshEmit(e) {
            e.sender.options.transitions = false
            e.sender.refresh()
            e.preventDefault()
        },

        setOptions() {
            this.chart.setOptions({
                ...this.options,
            })
        },
    },
}
</script>

<docs>
## Examples

Kendo Pie Chart

```jsx
    <m-chart-kendo-pie
        :options="{
            series: [
                {
                    data: [
                        {
                            category: 'Hydro',
                            value: 22,
                        },
                        {
                            category: 'Solar',
                            value: 2,
                        },
                        {
                            category: 'Nuclear',
                            value: 49,
                        },
                        {
                            category: 'Wind',
                            value: 27,
                        },
                    ],
                },
            ]
        }"
    />
```
</docs>
