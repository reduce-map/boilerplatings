module.exports = {
    componentsRoot: 'src', // путь к вашим компонентам
    components: '**/*.vue', // паттерн для поиска компонентов
    outDir: 'docs', // директория для сохранения сгенерированных файлов документации
//     TODO 11
//     templates: {
//         component: (renderedUsage, doc) => {
//             return `
// # ${doc.displayName}
//
// ${doc.description || ''}
//
// ${renderedUsage.props ? `## Props\n\n${renderedUsage.props}` : ''}
// ${renderedUsage.methods ? `## Methods\n\n${renderedUsage.methods}` : ''}
// ${renderedUsage.events ? `## Events\n\n${renderedUsage.events}` : ''}
// ${renderedUsage.slots ? `## Slots\n\n${renderedUsage.slots}` : ''}
// `
//         }
//     }
}
