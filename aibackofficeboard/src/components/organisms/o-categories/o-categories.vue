<template>
    <div class="o-categories">
        <div class="heading">
            <h2>Categories</h2>

            <div class="grid-controls">
                <Input
                    class="grid-control app-input"
                    suffix="ios-search"
                    placeholder="Category Search"
                    style="width: 200px"
                />
                <a-button
                    class="grid-control"
                    @click.native="$modal.show('add-category')"
                >
                    ADD CATEGORY
                </a-button>
            </div>
        </div>

        <div class="categories-holder">
            <div class="column">
                <m-category-row
                    v-for="(category, index) in categories"
                    :key="index"
                    class="category-row"
                    :class="{
                        'selected-category':
                            selectedCategory &&
                            selectedCategory.name === category.name,
                    }"
                    :category="category"
                    @more="onMoreClick"
                    @edit="onEditClick"
                >
                    <div class="div">
                        <h3>{{ category.name }}</h3>
                        <p>{{ category.sub }} subordinates</p>
                    </div>
                </m-category-row>
            </div>
            <div v-if="selectedCategory" class="column">
                <a-sub-category-header>
                    <h3>{{ selectedCategory.name }}</h3>
                    <p>{{ selectedCategory.sub }} subordinates</p>
                </a-sub-category-header>
                <m-sub-category-row
                    v-for="(subCategory, index) in subCategories"
                    :key="index"
                    class="category-row"
                    :class="{
                        'selected-category':
                            selectedSubCategory &&
                            selectedSubCategory.name === subCategory.name,
                    }"
                    :sub-category="subCategory"
                    @more="onMoreSubClick"
                    @edit="onEditSubClick"
                >
                    <div class="div">
                        <h3>{{ subCategory.name }}</h3>
                        <p>{{ subCategory.sub }} subordinates</p>
                    </div>
                </m-sub-category-row>
            </div>
            <div v-if="selectedCategory && selectedSubCategory" class="column">
                <a-sub-category-header>
                    <h3>{{ selectedSubCategory.name }}</h3>
                    <p>{{ selectedSubCategory.sub }} subordinates</p>
                </a-sub-category-header>
                <m-sub-sub-category-row
                    v-for="(subSubCategory, index) in subSubCategories"
                    :key="index"
                    class="category-row"
                    :sub-sub-category="subSubCategory"
                    @more="onMoreSubClick"
                    @edit="onEditSubClick"
                >
                    <div class="div">
                        <h3>{{ subSubCategory.name }}</h3>
                    </div>
                </m-sub-sub-category-row>
            </div>
        </div>

        <o-category-modal />
    </div>
</template>

<script>
import { Input } from 'view-design'
import AButton from '@atoms/a-button'
import ASubCategoryHeader from '@atoms/a-sub-category-header'
import MCategoryRow from '@molecules/m-category-row'
import MSubCategoryRow from '@molecules/m-sub-category-row'
import MSubSubCategoryRow from '@molecules/m-sub-sub-category-row'
import OCategoryModal from '@organisms/o-category-modal'

export default {
    name: 'OCategories',
    components: {
        OCategoryModal,
        Input,
        AButton,
        MCategoryRow,
        MSubCategoryRow,
        MSubSubCategoryRow,
        ASubCategoryHeader,
    },
    data() {
        return {
            categories: [
                {
                    name: 'Bakery',
                    sub: 14,
                },
                {
                    name: 'Canned Goods',
                    sub: 2,
                },
                {
                    name: 'Dairy Products',
                    sub: 6,
                },
            ],
            subCategories: [
                {
                    name: 'Sub Bakery',
                    sub: 14,
                },
                {
                    name: 'Sub Canned Goods',
                    sub: 2,
                },
                {
                    name: 'Sub Dairy Products',
                    sub: 6,
                },
            ],
            subSubCategories: [
                {
                    name: 'Sub Sub Bakery',
                },
                {
                    name: 'Sub Sub Canned Goods',
                },
                {
                    name: 'Sub Sub Dairy Products',
                },
            ],
            selectedCategory: null,
            selectedSubCategory: null,
        }
    },
    methods: {
        onMoreClick(category) {
            if (
                this.selectedCategory &&
                this.selectedCategory.name === category.name
            ) {
                this.selectedCategory = null
            } else {
                this.selectedCategory = category
            }
            this.selectedSubCategory = null
        },
        onEditClick(category) {
            console.log(category)
        },
        onMoreSubClick(subcategory) {
            if (
                this.selectedCategory &&
                this.selectedCategory.name === subcategory.name
            ) {
                this.selectedSubCategory = null
            } else {
                this.selectedSubCategory = subcategory
            }
        },
        onEditSubClick(subcategory) {
            console.log(subcategory)
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
