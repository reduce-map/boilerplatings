<template>
    <div class="o-project-main">
        <o-project-edit class="section" />
        <o-project-users />
    </div>
</template>

<script>
import OProjectEdit from '@organisms/o-project-edit'
import OProjectUsers from '@organisms/o-project-users'
import { authComputed, languageComputed } from '@state/helpers'

export default {
    name: 'OProjectMain',
    components: {
        OProjectUsers,
        OProjectEdit,
    },
    data() {
        return {
            projectForm: {
                projectName: '',
                projectLanguage: '',
            },
            projectLanguages: [],
        }
    },
    computed: {
        ...authComputed,
        ...languageComputed,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
