<template>
    <div class="t-login">
        <div class="info">
            <a-logo class="logo-login" :is-login="true" />

            <div class="text-holder">
                <img src="@assets/bg-1.png" class="bg" alt="bg" />
                <div class="holder">
                    <h2>
                        Agile localization solution for tech companies
                    </h2>
                    <p>
                        Translate center is a cloud-based solution that
                        streamlines localization management for your team. It's
                        the perfect place to effectively manage all of your
                        multilingual content.
                    </p>
                </div>
            </div>

            <o-language-select-app class="language-select-app" />
        </div>

        <main class="main">
            <router-view />
        </main>
    </div>
</template>

<script>
import ALogo from '@atoms/a-logo'
import OLanguageSelectApp from '@organisms/o-language-select-app'

export default {
    name: 'TLogin',
    components: {
        ALogo,
        OLanguageSelectApp,
    },
}
</script>

<style lang="scss" scoped>
@import 'theme';
</style>
