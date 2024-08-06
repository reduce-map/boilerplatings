import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import sidebarConfig from './sidebarConfig.json'

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme(sidebarConfig),
    lang: 'en-US',
    title: 'Hello 11 VuePress',
    description: 'Just playing around'
})
