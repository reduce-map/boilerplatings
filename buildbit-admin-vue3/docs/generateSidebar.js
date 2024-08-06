const fs = require('fs')
const path = require('path')

const docsPath = path.resolve(__dirname)
const pagesPath = path.join(docsPath, '.')
const componentsPath = path.join(docsPath, 'components')
const sidebarConfigPath = path.join(docsPath, '.vuepress/sidebarConfig.json')

function getMarkdownFiles(dir) {
    return fs.readdirSync(dir).filter(file => file.endsWith('.md'))
}

function getSidebarConfig() {
    const pages = getMarkdownFiles(pagesPath).map(file => `/${file}`)
    const components = fs.readdirSync(componentsPath).flatMap(folder => {
        const folderPath = path.join(componentsPath, folder)
        return getMarkdownFiles(folderPath).map(file => `/components/${folder}/${file}`)
    })

    return {
        sidebar: [
            {
                text: 'Setup and development',
                collapsible: true,
                children: pages,
            },
            {
                text: 'Components',
                collapsible: true,
                children: components,
            },
        ],
    }
}

const config = getSidebarConfig()

fs.writeFileSync(sidebarConfigPath, JSON.stringify(config, null, 2))
console.log(`Sidebar configuration has been written to ${sidebarConfigPath}`)
