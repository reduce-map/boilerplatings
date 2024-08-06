import { mapState, mapGetters, mapActions } from 'vuex'

// auth service
export const authComputed = {
    ...mapState('auth', {
        authToken: state => state.authToken,
        userUuid: state => state.userUuid,
    }),
    ...mapGetters('auth', ['loggedIn', 'userUuid']),
}

export const authMethods = {
    ...mapActions('auth', ['logIn', 'logOut', 'setAuth']),
}

// language service
export const languageComputed = {
    ...mapGetters('language', ['languages']),
}

// project service
export const projectComputed = {
    ...mapGetters('project', ['project']),
}

export const projectMethods = {
    ...mapActions('project', ['setProject']),
}

// resources service
export const resourcesComputed = {
    ...mapGetters('resources', ['tags', 'resources']),
}
export const resourcesMethods = {
    ...mapActions('resources', ['setTags', 'setResources']),
}

// notifications
export const notificationsComputed = {
    ...mapGetters('notifications', ['error', 'info']),
}

export const notificationsMethods = {
    ...mapActions('notifications', ['setError', 'setInfo']),
}

// user
export const userComputed = {
    ...mapGetters('user', ['user']),
}
export const userMethods = {
    ...mapActions('user', ['setProfile', 'getProfile']),
}
