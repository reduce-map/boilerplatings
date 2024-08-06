<template>
    <nav aria-label="Paginator example">
        <ul class="pagination">
            <li :class="['page-item', page === 1 ? 'disabled' : '']">
                <a
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                    @click.prevent="selectPrevPage">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li
                v-for="item in pages"
                :key="item"
                :class="[page === item ? 'active' : '', 'page-item']">
                <a
                    class="page-link"
                    href="#"
                    @click.prevent="selectPage(item)">
                    {{ item }}
                </a>
            </li>
            <li :class="['page-item', page === pages ? 'disabled' : '']">
                <a
                    class="page-link"
                    href="#"
                    aria-label="Next"
                    @click.prevent="selectNextPage">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Pagination',
    model: {
        prop: 'page'
    },
    props: {
        pages: {
            type: Number,
            required: true
        },
        page: {
            type: Number,
            required: true
        }
    },
    methods: {
        selectPage(page) {
            this.$emit('input', page)
        },
        selectPrevPage() {
            const nextPage = this.page - 1
            nextPage > 0 && this.selectPage(nextPage)
        },
        selectNextPage() {
            const nextPage = this.page + 1
            nextPage <= this.pages && this.selectPage(nextPage)
        }
    }
}
</script>
