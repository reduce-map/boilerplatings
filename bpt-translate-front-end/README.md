# Translator front-end

TODO

- design
    - see design folder
    - jira solution - sidebar tree
- API
    - test
        +    login
        +    logout (return Url)
        +    registration
        +   related users members

        +   project info
            +  see name
            +   edit name
            +   see languages
            +   add language
            +   delete language

        +   project members
            +   see them
            +   delete member
            +   add member

        - resources
            - see resouces by tabs +-
            - filter/add tab by lang
            + add resource
            + upload resourse
            + delete resourse
            - filters: by tag and search by key

        -   project statistic
            - TODO

        -   project tasks
            - see tasks
            - add task
            - edit task


  -   user projects
                    -   add
                    -   delete
                    -   change


+ // Project Statistic - load all tasks - statistic for specific task - represent in list

TODO till Friday:
Priority A
        -   add user to project (TODO)
               -    /projects/{projectUuid}/users/confirm

        -   project members
            -   edit (TODO)
        -   accept task

        - i18n - translations
            - save language

        + gloabal error handing

         - roles
            - translator
            - admin
            - developer

Priority B
        - test for all screens
        - gifs - test cases



Action points:
- среда - code freeze
- чт - markup gaps
- пт - сдача - как будет происходить?


- после добавления проекта пользователь сразу проваливается в проект
- если я оунер я могу удалить проект на старнице проектов


+ loading on add user to project modal

+ user -> known languages

+{
  "uuid": "string",
  "name": "string",
  "login": "string",
  "language": { - язык интерфейса - eng rus
    "code": "string",
    "name": "string"
  },
  "knownLanguages": [ - списко языков который знает - 100... языка
    {
      "code": "string",
      "name": "string"
    }
  ]
}

+ пагинация скрыть ненужные номера страниц

+ ресурсы - табы по первичным языкам (спискоя зыков проекта) -> под ними чекбоксы с
языками без первичного языка табы, при селекте чекбокса - добавляется колонка с выбранным языком

- tasks
    - completed and approved  в одном столбце

create

export enum ResourceSelectionKind {
    All = "all", - all
    Query = "query", - tags
    Items = "items", - resource
}
