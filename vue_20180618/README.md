# vue_20180618

##ДЗ 0

Материалы для предварительного изучения:

Vue. Документация на русском. Добавляем в закладки и изучаем :)
Документация (https://ru.vuejs.org/v2/guide/)
Страница API. Некоторые подробности встречаются только тут (https://ru.vuejs.org/v2/api/)

Webpack. С его помощью станем собирать проект через несколько занятий:
Официальный сайт (https://webpack.js.org/)
Скринкаст по Webpack. Основы, но версия старая (https://learn.javascript.ru/screencast/webpack)
Воркшоп с более новой версией Webpack (https://www.youtube.com/playlist?list=PLTbz5Wv5vNcs0zKKmF0DSo6m05RnMqUXk)
Модули (https://learn.javascript.ru/modules)

Node.js. Потребуется для Webpack и для установки пакетов через npm:
Официальный сайт (https://nodejs.org/en/)
Скринкаст по Node.js, достаточно с 1-й по 7-ю части (http://learn.javascript.ru/screencast/nodejs)
Официальный сайт Yarn, аналога npm (https://yarnpkg.com/lang/en/)

Современные возможности JS. Будем использовать для сокращения кода:
Современные возможности JS (http://learn.javascript.ru/es-modern)
Методы перебора массивов (http://learn.javascript.ru/array-iteration)
Promise (http://learn.javascript.ru/promise)
Стрелочные функции (http://learn.javascript.ru/es-function)
Деструктуризация (http://learn.javascript.ru/destructuring)
Примеры использования новых возможностей JS (https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e)

##ДЗ 1

Создать HTML-страничку/в онлайн-редакторе и подключить Vue с CDN
Создать корневой экземпляр и убедиться что данные из него выводятся на странице
В данных реализовать хранение списка пользователей (пять хватит; у каждого пользователя предусмотреть хранение имени, фамилии, отчества и ссылки на картинку аватарки)
Показать на странице список пользователей в виде таблицы
Для пользователей без аватарки выводить сообщение/показывать аватарку по умолчанию
Добавить заголовок к таблице с указанием общего количества пользователей
Добавить кнопку для скрытия/отображения всего списка пользователей

Задание, если захочется большего:
Подсчитывать количество пользователей не через метод, а через вычисляемое свойство
Создать фильтр чтобы выводить в таблице данные пользователя в верхнем регистре
Использовать директиву v-copy для кнопок копирования ФИО каждого пользователя
Использовать директиву v-tooltip, чтобы выводить справку для кнопки показать/скрыть список

Материалы для самостоятельного изучения:
Установка Vue (https://ru.vuejs.org/v2/guide/installation.html)
Список директив Vue (https://ru.vuejs.org/v2/api/#Директивы)
Экземпляр Vue (https://ru.vuejs.org/v2/guide/instance.html)
Синтаксис шаблонов (https://ru.vuejs.org/v2/guide/syntax.html)
Работа с классами и стилями (https://ru.vuejs.org/v2/guide/class-and-style.html)
Условный рендеринг (https://ru.vuejs.org/v2/guide/conditional.html)
Рендеринг списков (https://ru.vuejs.org/v2/guide/list.html)
Подробнее про data, локальное состояние компонента (https://ru.vuejs.org/v2/api/#data)

Ссылки по теме:
https://plnkr.co/edit/
Панель инструментов DevTools для Vue (https://github.com/vuejs/vue-devtools)
Возможность изменить разделители при конфликтах (https://ru.vuejs.org/v2/api/#delimiters)
Подробнее о системе реактивности (https://ru.vuejs.org/v2/guide/reactivity.html)
Геттеры и сеттеры свойств (http://learn.javascript.ru/descriptors-getters-setters)
Как создавать собственные директивы (https://ru.vuejs.org/v2/guide/custom-directive.html)
Пример директивы: https://github.com/Akryum/v-tooltip
Пример директивы: https://github.com/egoist/v-copy
Пример директивы: https://github.com/ndelvalle/v-click-outside
Фильтры (https://ru.vuejs.org/v2/guide/filters.html)
Примеры создания фильтров (https://pineco.de/getting-started-with-vue-filters/)

Что почитать ещё:
Интервью автора фреймворка Vue (https://medium.com/@vvladislavv/vue-js-в-2018-интервью-автора-фреймворка-vue-js-эван-ю-33d8a0b71a2)
Как написать свой виртуальный DOM (https://medium.com/devschacht/how-to-write-your-own-virtual-dom-c166b56cf01f)
Как создать реактивный фреймворк на JavaScript (https://medium.com/@monochromer/как-создать-реактивный-фреймворк-на-javascript-cfa34c63fd52)
Порядок вызова родительских и дочерних хуков жизненного цикла (https://medium.com/@brockreece/vue-parent-and-child-lifecycle-hooks-5d6236bd561f)

Код реализованный на занятии:
Пример с вариантами подключения: https://plnkr.co/edit/N3NPuwZAlmuSufOxDMMc
Пример с использованием биндингов: https://plnkr.co/edit/u5Vr8MeF17zZtdRuaabz
Пример с экземпляром Vue и списком хуков: https://plnkr.co/edit/Bx46PmS91rBYenvazMPB
Пример со списком, условиями, классами: https://plnkr.co/edit/swIKTTZdOMTik8ud7I3B

##ДЗ 2

Задание, программа минимум:
Создать репозиторий (GitHub, BitBucket, etc) для проекта
Подключить для стилизации Bootstrap (по желанию, просто для стилизации)
Создать файлы под страницы списка пользователей и редактирования пользователя
Отслеживать момент «загрузки» данных и выводить об этом сообщение в консоль
На странице списка пользователей хранить массив, использовать компонент для отображения списка, который выводит их в виде таблицы (в иерархии компонентов внутри Root → UserList)
На странице редактирования пользователя хранить объект с данными пользователя, использовать компонент для отображения «формы» с данными пользователя для редактирования свойств (в иерархии компонентов внутри Root → UserForm)

Задание, если захочется большего:
Сгенерировать JSON-файл с фейковыми данными пользователей
Установить json-server и настроить на выдачу этого JSON-файла
Реализовать загрузку списка пользователей
Реализовать загрузку пользователя для редактирования
Переход на страницу редактирования пользователя с ID-пользователя в query и загрузка данных нужного пользователя (можно с помощью плагина vue-async-computed)
Реализовать псевдо-SPA и на одной странице динамическим переключением компонентов реализовать переходы по ссылкам из меню

Материалы для самостоятельного изучения:
Вычисляемые свойства и методы наблюдатели (https://ru.vuejs.org/v2/guide/computed.html)
Варианты записи watch (https://ru.vuejs.org/v2/api/#watch)
Динамическое добавление watch (https://ru.vuejs.org/v2/api/#vm-watch)
Тонкости отслеживания изменений в массивах (https://ru.vuejs.org/v2/guide/list.html#Отслеживание-изменений-в-массивах)
Тонкости отслеживания изменений при изменениях объектов (https://ru.vuejs.org/v2/guide/list.html#Предостережения-об-изменениях-объектов)
События и модификаторы событий (https://ru.vuejs.org/v2/guide/events.html)
Перечень способов отслеживания событий, варианты записи (https://ru.vuejs.org/v2/api/#v-on)
Как создавать собственные псевдонимы для кодов клавиш (https://ru.vuejs.org/v2/api/#keyCodes)
Работа с формами, доступные модификаторы (https://ru.vuejs.org/v2/guide/forms.html)
Основы компонентов (https://ru.vuejs.org/v2/guide/components.html)
Регистрация компонентов (https://ru.vuejs.org/v2/guide/components-registration.html)
Входные параметры компонентов (https://ru.vuejs.org/v2/guide/components-props.html)
Пользовательские события (https://ru.vuejs.org/v2/guide/components-custom-events.html)

Ссылки по теме:
Генератор фейковых данных (https://next.json-generator.com/)
Шаблон генерации пользователей (https://pastebin.com/96BQ10wF)
JSON-server (https://github.com/typicode/json-server)
Используем axios для доступа к API (https://ru.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)

Что почитать ещё:
Плагин для вычисляемых свойств с асинхронной логикой (https://github.com/foxbenjaminfox/vue-async-computed)
Плагин для альтернативной записи типов входных параметров (https://github.com/dwightjack/vue-types)
Примеры решения часто встречающихся проблем (https://medium.com/@stijlbreuk/six-random-issues-and-their-solutions-in-vuejs-b16d470a6462)
Подборка допускаемых ошибок (https://itnext.io/how-not-to-vue-18f16fe620b5)

Код реализованный на занятии:
Пример с computed/watch: https://plnkr.co/edit/hzb6SX415L0XRN9jqxso?p=preview
Пример с событиями и формами: https://plnkr.co/edit/6DjaLHAy0vuFIcfw6aXI?p=preview
Пример с компонентом: https://plnkr.co/edit/pgVKotq3BJz8FE3EuLGx?p=preview

##ДЗ 3

Задание, программа минимум
Установить Node.js (и по желанию Yarn; все можно делать и без него через NPM)
Создать проект с помощью vue-cli 3 (из необходимого: Vue-router, Babel, ESLint, Prettier)
Сгенерировать список пользователей через JSON-generator (пару десятков хватит)
Установить пакет json-server для REST API
Перенести HTML-страницы и компоненты в них в файлы .vue
Реализовать переходы между страницами через vue-router
Реализовать выделение активного пункта в панели меню
Реализовать загрузку списка пользователей и пользователя на редактирование по REST API
Задание, если хочется большего:
Реализовать полное взаимодействие по REST API (получение списка пользователей, создание пользователя, редактирование и удаление пользователя)
Добавить лоадер NProgress при переходе между страницами
Реализовать отправку с каждым AJAX-запросом заголовка Authorization с каким-то значением (которое в реальном проекте будет токеном)
Реализовать проверку перед переходом на страницу списка пользователей, только если в LocalStorage хранится определенный ключ (псевдо-авторизация)
Материалы для самостоятельного изучения:
Документация Vue-cli (https://cli.vuejs.org/) (пока нет русской, в процессе перевода)
Создание проекта через Vue-cli (https://cli.vuejs.org/guide/creating-a-project.html)
Запуск проекта (https://cli.vuejs.org/guide/cli-service.html)
Как расширять конфигурацию Webpack (https://cli.vuejs.org/guide/webpack.html)
Документация Vue-loader (https://vue-loader.vuejs.org/ru/)
Обработка вложенных URL (https://vue-loader.vuejs.org/ru/guide/asset-url.html)
Использование пре-процессоров (https://vue-loader.vuejs.org/ru/guide/pre-processors.html)
Локальный CSS (https://vue-loader.vuejs.org/ru/guide/scoped-css.html)
CSS модули (https://vue-loader.vuejs.org/ru/guide/css-modules.html)
Горячая перезагрузка модулей (https://vue-loader.vuejs.org/ru/guide/hot-reload.html)
Документация Vue-router (https://router.vuejs.org/ru/)
Опции конструктора Vue-router (https://router.vuejs.org/ru/api/#опции-конструктора-router)
Добавляемые Vue-router компоненты (https://router.vuejs.org/ru/api/#router-link и https://router.vuejs.org/ru/api/#router-view)
Интеграция vue-router в компоненты (https://router.vuejs.org/ru/api/#интеграция-в-компоненты)
Динамические пути (https://router.vuejs.org/ru/guide/essentials/dynamic-matching.html)
Программная навигация (https://router.vuejs.org/ru/guide/essentials/navigation.html)
Навигационные хуки (https://router.vuejs.org/ru/guide/advanced/navigation-guards.html)
Метаданные маршрутов (https://router.vuejs.org/ru/guide/advanced/meta.html)
Однофайловые компоненты (https://ru.vuejs.org/v2/guide/single-file-components.html)
Модули JS (https://learn.javascript.ru/modules)
Что почитать ещё:
Как структурировать проект на Vue (https://itnext.io/how-to-structure-a-vue-js-project-29e4ddc1aeeb)
Архитектура Vue которая работала для меня в маленьких и больших приложениях (https://medium.com/@ederng/the-vue-architecture-that-worked-for-me-in-small-and-large-apps-9b253cf92951)
Настройка ESLint + Prettier в новом Vue-cli (https://medium.com/@doppelmutzi/kick-starting-a-sophisticated-eslint-and-prettier-workflow-with-vue-cli-3-in-a-few-minutes-76bf10370636)
Пример другого сборщика. Vue + Parcel (https://alligator.io/vuejs/vue-parceljs/)
Пример еще одного шаблона проекта (https://github.com/chrisvfritz/vue-enterprise-boilerplate)
Как реализовать собственный роутер (https://vueschool.io/articles/series/creating-your-own-router/)
Вариация определения роутов (https://github.com/raniesantos/vue-routisan)
Доступ по ролям в роуты (https://github.com/anthonygore/vue-router-user-roles)
Примеры реализации лоадеров (https://scotch.io/tutorials/add-loading-indicators-to-your-vuejs-application)
Настройка Vue и Webpack вручную, в трех частях:
Первая часть (https://itnext.io/vuejs-and-webpack-4-from-scratch-part-1-94c9c28a534a)
Вторая часть (https://itnext.io/vue-js-and-webpack-4-from-scratch-part-2-5038cc9deffb)
Третья часть (https://itnext.io/vue-js-and-webpack-4-from-scratch-part-3-3f68d2a3c127)
Пять простых шагов для понимания JSON Web Tokens (JWT) (https://habr.com/post/340146/)
Ссылки по теме:
Webpack (https://webpack.js.org/)
Генератор фейковых данных (https://next.json-generator.com/)
Шаблон генерации пользователей (https://pastebin.com/96BQ10wF)
Vue-cli (https://github.com/vuejs/vue-cli)
JSON-server (https://github.com/typicode/json-server)
JWT (https://jwt.io/)
Репозиторий с кодом сделанным на занятии:
Компоненты в HTML-файлах: https://github.com/Alex-Sokolov/vue-course-app/tree/01-before-webpack
Компоненты во vue-файлах: https://github.com/Alex-Sokolov/vue-course-app/tree/02-vue-cli-template

##ДЗ4
Оставить обратную связь!
https://goo.gl/forms/C6JQthI2BWpWPWi22

Задание, программа минимум:
Реализовать полное взаимодействие по REST API (получение списка пользователей, создание пользователя, редактирование и удаление пользователя)
Доработать компонент формы для отображения всех свойств фейковых данных разными типами полей (список полей, не нужно универсального определения типа поля)
Доработать компонент-форму пользователя для работы через v-model
Реализовать компонент пагинации для таблицы (группа кнопок с возможностью перейти на выбранный номер страницы) + работающий через v-model
Реализовать компонент выбора количества строк в таблице (select с несколькими вариантами количества строк на странице) + работающий через v-model
Создать компонент «умной» таблицы, внутри которой будут компоненты управления  (пагинация, количество элементов на строку и итоговый список) (https://www.dropbox.com/s/ui31mhko2x7rcla/Smart%20table%20example.png?dl=0)
Реализовать асинхронную подгрузку компонентов-страниц и переиспользуемых компонентов

Задание, если хочется большего:
Добавить на странице редактирования пользователя ссылки перехода к следующему/предыдущему пользователю (ID больше/меньше на 1) и доработать обновление данных
Добавить в компонент пагинации кнопки перехода на следующую/предыдущую страницы
Добавить в компонент таблицы компонент поиска по фамилии
Добавить в компонент формы реализованную отдельным компонентом загрузки аватарки на сервис IMGUR (не плагином, а через обычное поле и логику) + работающий через v-model

Материалы для самостоятельного изучения:
Документация Vue-router (https://router.vuejs.org/ru/)
Опции конструктора Vue-router (https://router.vuejs.org/ru/api/#опции-конструктора-router)
Добавляемые Vue-router компоненты (https://router.vuejs.org/ru/api/#router-link и https://router.vuejs.org/ru/api/#router-view)
Интеграция vue-router в компоненты (https://router.vuejs.org/ru/api/#интеграция-в-компоненты)
Динамические пути (https://router.vuejs.org/ru/guide/essentials/dynamic-matching.html)
Программная навигация (https://router.vuejs.org/ru/guide/essentials/navigation.html)
Навигационные хуки (https://router.vuejs.org/ru/guide/advanced/navigation-guards.html)
Метаданные маршрутов (https://router.vuejs.org/ru/guide/advanced/meta.html)
Возможности по разделению кода в Webpack (https://webpack.js.org/guides/code-splitting/)
Динамические и асинхронные компоненты (https://ru.vuejs.org/v2/guide/components-dynamic-async.html)
Ленивая загрузка маршрутов (https://router.vuejs.org/ru/guide/advanced/lazy-loading.html)
Компоненты. Настройка v-model (https://ru.vuejs.org/v2/guide/components-custom-events.html#Настройка-v-model-у-компонента)
Атрибут ref (https://ru.vuejs.org/v2/api/#ref)

Что почитать ещё:
Три способа разделения кода в приложении на Vue (https://medium.com/js-dojo/3-code-splitting-patterns-for-vuejs-and-webpack-b8fff1ea0ba4)
Создание прозрачных компонентов-обёрток (https://zendev.com/2018/05/31/transparent-wrapper-components-in-vue.html)
Компоненты. Обработка крайних случаев (https://ru.vuejs.org/v2/guide/components-edge-cases.html)
Доступ к экземплярам дочерних компонентов & элементов (https://ru.vuejs.org/v2/guide/components-edge-cases.html#Доступ-к-экземплярам-дочерних-компонентов-amp-элементов)

Ссылки по теме:
https://github.com/axios/axios
https://github.com/github/fetch
https://apidocs.imgur.com/#authorization-and-oauth
https://github.com/rtivital/proschet
Пример компонентов: https://github.com/alexjoverm/v-lazy-image
Пример развернутого проекта: https://github.com/zmts/vuejs-boilerplate

Репозиторий с кодом сделанным на занятии:
Пример с развёрнутым проектом из шаблона: https://github.com/Alex-Sokolov/vue-course-app/tree/02-vue-cli-template

##ДЗ5
Задание

Материалы для самостоятельного изучения:
Распределение контента слотами (https://ru.vuejs.org/v2/guide/components.html#Распределение-контента-слотами)
Слоты (https://ru.vuejs.org/v2/guide/components-slots.html)
Атрибут ref (https://ru.vuejs.org/v2/api/#ref)
Программное добавление прослушивателей событий (https://ru.vuejs.org/v2/guide/components-edge-cases.html#Программное-добавление-прослушивателей-событий)

Задание, программа минимум
Добавить редиректы (после редактирования/удаления на список пользователей; после создания на редактирование этого пользователя)
Реализовать компонент-календарик и подключить для поля “День рождения” с дополнительной кнопкой открытия календаря (как клик по полю)
Реализовать компонент с красивым редактором и подключить для поля «Биография”
Доработать компонент таблицы для возможности настройки отображения (через слоты)
Создать страницу с телефонным справочником пользователей (фамилия - телефон), где переиспользовать компонент таблицы

Задание, если хочется большего:
Создать компонент с стилизованным чекбоксом для поля «Активен» (можно через плагин, можно через CSS)
Добавить валидацию на несколько полей формы
Добавить поддержку drag’n’drop для загрузки аватарки (с помощью плагина Dropzone)
Доработать компонент таблицы для server-side пагинации

Ссылки по теме:
http://bootstrap-datepicker.readthedocs.io/en/latest/
https://github.com/chmln/flatpickr
https://github.com/dbushell/Pikaday
https://github.com/yabwe/medium-editor
https://github.com/davidroyer/vue2-editor

https://monterail.github.io/vuelidate/
https://baianat.github.io/vee-validate/
https://github.com/epoberezkin/ajv

https://github.com/enyo/dropzone
https://github.com/typicode/json-server#paginate
https://github.com/typicode/json-server#full-text-search

Репозиторий с кодом сделанным на занятии:
https://github.com/Alex-Sokolov/vue-course-app/tree/03-vue-cli-plugins

#ДЗ 6
Материалы для самостоятельного изучения:
Управление состоянием приложения (https://ru.vuejs.org/v2/guide/state-management.html)
Документация Vuex (https://vuex.vuejs.org/ru/)
Мутации (https://vuex.vuejs.org/ru/mutations.html)
Геттеры (https://vuex.vuejs.org/ru/getters.html)
Действия (https://vuex.vuejs.org/ru/actions.html)
Строгий режим (https://vuex.vuejs.org/ru/strict.html)
Работа с формами (https://vuex.vuejs.org/ru/forms.html)
Тестирование Vuex (https://vuex.vuejs.org/ru/guide/testing.html)
Модульное тестирование (https://ru.vuejs.org/v2/guide/unit-testing.html)
Документация Vue-test-utils (https://vue-test-utils.vuejs.org/ru/)
Общие советы (https://vue-test-utils.vuejs.org/ru/guides/common-tips.html)
Тестирование нажатий клавиш, мыши и других событий DOM (https://vue-test-utils.vuejs.org/ru/guides/dom-events.html)
Настройка вручную тестирования однофайловых компонентов с Jest (https://vue-test-utils.vuejs.org/ru/guides/testing-SFCs-with-jest.html)
Тестирование асинхронной логики (https://vue-test-utils.vuejs.org/ru/guides/testing-async-components.html)
Тестирование & Vue-router (https://vue-test-utils.vuejs.org/ru/guides/using-with-vue-router.html)
Тестирование & Vuex (https://vue-test-utils.vuejs.org/ru/guides/using-with-vuex.html)

Задание, программа минимум:
Добавить централизованное хранилище с помощью Vuex в проект
Реализовать отображение свойства из Vuex
Добавить поле формы привязанное через v-model к свойству из Vuex
Добавить vue-test-utils в проект
Добавить тесты на компонент

Задание, если хочется большего:
Переделать получение списка пользователей из хранилища Vuex

Ссылки по теме:
Документация Jest (https://jestjs.io/)
Методы Jest для сравнений (https://jestjs.io/docs/en/expect)
Best practices авторизации для Vue (https://medium.com/@pavelgonzales/best-practices-авторизации-для-vue-8b769589001a)
Пять ошибок, которые следует избегать при тестировании Vue (https://engineering.doximity.com/articles/five-traps-to-avoid-while-unit-testing-vue-js)
Abstracting Vuex/Redux Action patterns (https://medium.com/coding-stones/abstracting-vuex-redux-action-patterns-8df36b0e2fcc)
Пять Vuex-плагинов для вашего следующего проекта (https://dzone.com/articles/5-vuex-plugins-for-your-next-vuejs-project)
Когда использовать геттеры Vuex (https://codeburst.io/vuex-getters-are-great-but-dont-overuse-them-9c946689b414)
Еще один пример реализации авторизации (https://blog.sqreen.io/authentication-best-practices-vue/)
Redux vs Vuex (https://medium.com/@Musclenun/redux-vs-vuex-9b682529c36)
Аналог вспомогательных функций mapXXX (https://github.com/ktsn/vuex-mappers)
Пример связывания компонента с Vuex (https://github.com/ktsn/vuex-connect)
Пример работы с формами с Vuex (https://markus.oberlehner.net/blog/form-fields-two-way-data-binding-and-vuex/)
Тестирование слотов с Jest (https://alexjoverm.github.io/2017/10/02/Test-Vue-js-Slots-in-Jest/)
Wallaby.js (https://www.youtube.com/watch?v=-iba8ZZyEDo)
Интеграция Wallaby с Vue (https://wallabyjs.com/docs/integration/vue.html)

Репозиторий с кодом сделанным на занятии:
https://github.com/Alex-Sokolov/vue-course-app/tree/04-vuex
https://github.com/Alex-Sokolov/vue-course-app/tree/05-tests
