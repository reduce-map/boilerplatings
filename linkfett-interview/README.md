# linkfett

single page application на Vue.js, которое будет использовать бэкэнд https://test-backend.sempi.tech/

На главном экране список загруженных текстов и поле куда человек в браузере может вставить из буфера обмена любой небольшой текст на английском языке (до 1Mb).

При загрузке текст сохраняется и разбивается на предложения. В интерфейсе у каждого текста будет уникальная ссылка, которая показывает документ как список предложений.

После добавления текста пользователю показывается страница текста (список предложений).

При клике на предложение нужно находить другие тексты в которых есть похожие предложения и выводить их как список отсортированный по смысловой близости к выбранному предложению (от наиболее похожего к наименее похожему). В списке выводить само предложение, ссылку на текст содержащий это предложение, значение метрики похожести.

## Notes

-   Dev notes
    -   configured, simplified production ready boilerplate [Vue Enterprise Boilerplate]https://github.com/chrisvfritz/vue-enterprise-boilerplate ) for the task
    -   used store to decompose data layer, created several simple base components to decompose presentation layer just for the test task. In real life such simple decomposition is unnecessary.
    -   added notification component for error and information (when user successfully added text) notifications
    -   added some external components for UX development to speed up
    -   on localhost get CORS, to not to configure proxy - Chrome used for development - open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_sess_1" --disable-web-security
    -   add dist folder for the task, in real life dist folder will be in gitignore
-   UI/UX notes
    -   If suggested sentence exists the text list on the page. User will see 'scroll to {sentence number}'
    -   If user clicks of 'scroll to {sentence number}' there will be a highlighted sentence in the sentences list
    -   If there're no similar sentences, user will see text 'There're no similar sentences'
    -   added animations for UX
    -   added text mock
    -   in future could be added
        -   autoscroll on load with hash Text List of sentences page
        -   loading components state (animation)

## Documentation

This project includes a `docs` folder with more details on:

1.  [Setup and development](docs/development.md)
1.  [Architecture](docs/architecture.md)
1.  [Languages and technologies](docs/tech.md)
1.  [Routing, layouts, and views](docs/routing.md)
1.  [State management](docs/state.md)
1.  [Editor integration](docs/editors.md)
1.  [Building and deploying to production](docs/production.md)
1.  [Troubleshooting](docs/troubleshooting.md)
