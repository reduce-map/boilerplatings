<template>
    <div class="o-sales-bar">
        <div class="page-center-wrapper">
            <div class="holder">
                <div class="amount">
                    2546.90€
                </div>
                <div class="time-range">
                    {{ timeRangeStart | dayFullNumbers }} -
                    {{ today | dayFullNumbers }}
                </div>
                <div class="time-range-buttons">
                    <a-button-time-range
                        v-for="button in timeRangeButtons"
                        :key="button"
                        class="time-range-button"
                        :class="{
                            active: button === selected,
                        }"
                        @click.native="selected = button"
                    >
                        {{ button }}
                    </a-button-time-range>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AButtonTimeRange from '@atoms/a-button-time-range'
import moment from 'moment'

export default {
    name: 'OSalesBar',
    components: {
        AButtonTimeRange,
    },
    data() {
        return {
            selected: 'Month',
            timeRangeButtons: ['Day', 'Week', 'Month', 'Year', 'Total'],
            today: new Date(),
        }
    },
    computed: {
        timeRangeStart() {
            const selected = this.selected

            if (selected === 'Day') {
                return moment().subtract(1, 'days')
            }
            if (selected === 'Week') {
                return moment().subtract(1, 'week')
            }
            if (selected === 'Month') {
                return moment().subtract(1, 'months')
            }
            if (selected === 'Year') {
                return moment().subtract(1, 'years')
            }
            if (selected === 'Total') {
                return moment().subtract(10, 'year')
            }

            return new Date()
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
