<template>
    <div class="a-table">
        <div class="header">
            <slot name="header" />
        </div>
        <div class="body">
            <!-- TODO loading -->
            <template v-if="isEmpty">
                <slot name="empty">
                    there is no data
                </slot>
            </template>
            <template v-else>
                <div
                    v-for="(row, index) in data"
                    :key="row.vueKey"
                    class="table-row"
                >
                    <slot name="row" :row="row" :index="index" />
                </div>
            </template>
        </div>

        <div v-if="isPaginationEnabled" class="pagination">
            <div class="info">
                {{ $t('pagination.show') }} {{ page }}
                {{ $t('pagination.of') }} {{ pages }} ( {{ pageSize }} items per
                page )
            </div>
            <!--            TODO page size select of ... 5 10 20 100 ?-->
            <ul class="pagination-list">
                <li class="prev" @click="onPrevClick">
                    <i class="uil uil-angle-left"></i>
                </li>
                <li
                    v-for="(paginator, index) in paginationList"
                    :key="index"
                    :class="{
                        active: paginator === page,
                    }"
                    @click="onPaginationClick(paginator)"
                >
                    {{ paginator }}
                </li>
                <li class="next" @click="onNextClick">
                    <i class="uil uil-angle-right"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ATable',

    props: {
        data: {
            type: Array,
            required: true,
        },
        page: {
            type: Number,
            default: 0,
        },
        pages: {
            type: Number,
            default: 0,
        },
        pagination: {
            type: Boolean,
            default: false,
        },
        pageSize: {
            type: Number,
            default: 20,
        },
    },

    data() {
        return {
            paginatorLengthDefault: 4,
        }
    },

    computed: {
        isEmpty() {
            return this.data.length === 0
        },
        isPaginationEnabled() {
            return this.pagination === true
        },
        paginatorPage() {
            return Math.floor((this.page - 1) / this.paginatorLength)
        },
        paginationList() {
            return [...new Array(this.paginatorLength)]
                .map((el, index) => {
                    return this.paginatorPage * this.paginatorLength + index + 1
                })
                .filter(el => el <= this.pages)
        },

        paginatorLength() {
            return this.paginatorLengthDefault > this.pages
                ? this.pages
                : this.paginatorLengthDefault
        },
    },

    methods: {
        onNextClick() {
            const newPage = this.page + 1

            if (newPage <= this.pages) {
                this.$emit('onLoadData', {
                    page: newPage,
                })
            }
        },
        onPrevClick() {
            const newPage = this.page - 1

            if (newPage >= 1) {
                this.$emit('onLoadData', {
                    page: newPage,
                })
            }
        },
        onPaginationClick(paginator) {
            this.$emit('onLoadData', {
                page: paginator,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
