import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
    ...mapState('auth', {
        access_token: state => state.access_token,
    }),
    ...mapGetters('auth', ['loggedIn', 'userName']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])

// notifications
export const notificationsComputed = {
    ...mapGetters('notifications', ['error', 'info']),
}

export const notificationsMethods = {
    ...mapActions('notifications', ['setError', 'setInfo']),
}
