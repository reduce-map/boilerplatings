# aett

Intro Imagine that you are involved in the development of a large file storage system. Special feature here is storing photos and images. We need to provide our users with the possibility to view stored images from a web interface.

## Notes

-   Dev notes
    -   I used an instance of [vue-enterprise-boilerplate](https://github.com/chrisvfritz/vue-enterprise-boilerplate) because this boilerplate has base set-up for production development (docs, pre-commit, eslint, stylelint, auto-registration modules etc) and I used such set-up before and used it now to speed up development
    -   Global injection (for base components) was removed from the boilerplate because global injection is not the best practice
    -   I added vue router here for a future SPA, constant folder, decompose data to store, services folder and saved user data to local storage
    -   Styles are in Vue files, for my mind in real life it would be better to create a folder for component and put styles file there
-   UI/UX notes
    -   I spend much time for viewer component. I tried different libraries and chose v-viewer for first time, now I changed it to vue-zoomer

Thank you for your time

## Documentation

This project includes a `docs` folder with more details on:

1.  [Setup and development](docs/development.md)
1.  [Architecture](docs/architecture.md)
1.  [Languages and technologies](docs/tech.md)
1.  [Routing, layouts, and views](docs/routing.md)
1.  [State management](docs/state.md)
1.  [Building and deploying to production](docs/production.md)
1.  [Troubleshooting](docs/troubleshooting.md)
