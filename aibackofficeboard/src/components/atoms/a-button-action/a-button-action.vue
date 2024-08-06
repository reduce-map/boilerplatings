<template>
    <div class="a-button-action">
        <template v-if="localType === 'reset'">
            <i class="holder">
                <img
                    src="@assets/Reset Active.svg"
                    alt="reset"
                    class="active"
                />
                <img
                    src="@assets/Reset Default.svg"
                    alt="reset"
                    class="default"
                />
                <img src="@assets/Reset Hover.svg" alt="reset" class="hover" />
            </i>
        </template>
        <template v-if="localType === 'edit'">
            <i class="holder">
                <img src="@assets/Edit Active.svg" alt="reset" class="active" />
                <img
                    src="@assets/Edit Default.svg"
                    alt="reset"
                    class="default"
                />
                <img src="@assets/Edit Hover.svg" alt="reset" class="hover" />
            </i>
        </template>
        <template v-if="localType === 'delete'">
            <i class="holder">
                <img
                    src="@assets/Delete Active.svg"
                    alt="reset"
                    class="active"
                />
                <img
                    src="@assets/Delete Default.svg"
                    alt="reset"
                    class="default"
                />
                <img src="@assets/Delete Hover.svg" alt="reset" class="hover" />
            </i>
        </template>
        <template v-if="localType === 'more'">
            <i class="holder">
                <img
                    src="@assets/Learn more Active.svg"
                    alt="learn"
                    class="active"
                />
                <img
                    src="@assets/Learn more Default.svg"
                    alt="learn"
                    class="default"
                />
                <img
                    src="@assets/Learn more Hover.svg"
                    alt="learn"
                    class="hover"
                />
            </i>
        </template>
    </div>
</template>

<script>
export default {
    name: 'AButtonAction',
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    computed: {
        localType() {
            return this.type.toLowerCase()
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
