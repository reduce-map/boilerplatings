import ru from 'vee-validate/dist/locale/ru.json'

export default {
    app: {
        Log_in: 'Войти',
        Sign_in: 'Войти',
        email: 'электронная почта',
        Email: 'Электронная почта',
        Password: 'Пароль',
        password: 'пароль',
        Create_account: 'Создать аккаунт',
        register: 'зарегистрироваться',
        Register: 'Регистрация',
        Name: 'Имя',
        Surname: 'Фамилия',
        Set_password: 'Установить пароль',
        Confirmation_status: 'Статус подтверждения',
        Role: 'Роль',
        Known_languages: 'Известные языки',
        Actions: 'Действия',
        No_project_users: 'Нет пользователей проекта',
        confirm_delete_user:
            'Вы уверены, что хотите удалить пользователя из сервиса?',
        Project_members: 'Участники проекта',
        Add_user_to_project: 'Добавить пользователя в проект',
        Delete_user: 'Удалить пользователя',
        Add_user: 'Добавить пользователя',
        Members: 'Участники',
        Languages: 'Языки',
        Workspace: 'Рабочая область',
        Cards: 'Карточки',
        Table: 'Таблицы',
        Add_project: 'Добавить проект',
        Task_name: 'Имя задачи',
        Save: 'Сохранить',
        Loading: 'Загрузка',

        // confirm_delete_user: 'Вы уверены, что хотите удалить пользователя из сервиса?',

        languageType: 'Denomination',
        languageCode: 'Код',
        role: 'Роль',
        lang: 'Языки',

        avatar: 'Аватар',
        passwordConfirm: 'Подтвердить пароль',
        projectName: `имя проекта`,

        Forgot_password: 'Забыли пароль',
        Recover_Password: 'Восстановить пароль',
        Recover: 'Восстановить',

        // Header nav
        Related_users: 'Пользователи',
        Your_projects: 'Ваши проекты',
        Profile: 'Профиль',

        // Main nav
        Project: 'Проект',
        Project_statistics: 'Статистика проекта',
        Resources: 'Ресурсы',
        Tasks: 'Задачи',

        // Profile
        Your_email_is: 'Ваш электронный адрес',
        User_name: 'Имя пользователя',
        Enter_user_name: 'Введите имя пользователя',
        Choose_the_languages_you_know: 'Выберете языки которые знаете',
        Edit: 'Изменить',

        // Modal confirmation
        Yes: 'Да',
        No: 'Нет',
        Are_you_sure_project: 'Вы уверены, что хотите удалить проект?',

        // Modal project
        Project_name: 'Имя проекта',
        Enter_project_name: 'Введите имя проекта',
        Edit_project: 'Изменить проект',

        // Project
        Project_statistic: 'Статистика проекта:',
    },

    fields: {
        Log_in: 'Войти',
        Sign_in: 'Войти',
        Name: 'Имя',
        email: 'электронная почта',
        Email: 'Электронная почта',
        Password: 'Пароль',
        password: 'пароль',
        login: 'Логин',
        Task_name: 'Имя задачи',

        surname: 'фамилия',
        languageType: 'Denomination',
        languageCode: 'Код',
        role: 'Роль',
        lang: 'Языки',
        actions: 'Действия',
        avatar: 'Аватар',
        passwordConfirm: 'Подтвердить пароль',
        projectName: `имя проекта`,
        resourceName: 'Имя ресурса',
        resourceDescription: 'Описание ресурса',
        resourceValueName: 'Имя значения ресурса',
    },

    email: 'Электронная почта',
    message: {},

    auth: {
        login: 'Войти',
        registration: 'Регистрация',
        rememberMe: 'Помни меня',
        forgetPass: 'Забыли пароль?',
        agreeMsg: 'Согласен с условиями',
        conditionMsg: 'Вы должны согласиться до регистрации.',
        setPass: 'Установить пароль',
    },

    // Main nav

    header_nav: {
        profile: 'Профиль',
        notifications: 'Уведомления',
        logout: 'Выйти',
    },

    validation: ru.messages,

    pagination: {
        show: 'Показывать',
        of: 'из',
    },

    buttons: {
        submit: 'Отправить',
        save: 'Сохранить',
    },

    owner: {
        members: {
            header: 'Участник',
            hButton: 'Добавить участника',
            emptyList: 'У вас нет участников',
        },

        resources: {
            header: 'Ресурсы',
            hButton: 'Добавить ресурс',
        },

        tasks: {
            header: 'Задачи',
            hButton: 'Добавить задачу',
        },

        projEdit: {
            header: 'Редактирование проекта',
            projName: 'Название проекта',
            addAvatar: 'Добавить аватар проекта',
            changeAvatar: 'Изменить аватар проекта',
            tableName: 'Таблица участников',
        },
    },
}
