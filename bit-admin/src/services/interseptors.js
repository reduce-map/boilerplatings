import axios from 'axios';
// import { useAuthStore } from '../store';

// export const errorNotificationHandler = resp => {
//     const statusText = resp.response && resp.response.statusText;
//     const errorMessage = statusText ? statusText : Errors.defaultMessage;
//     store.dispatch('notifications/setError', errorMessage);
// };

export const applyInterceptors = (axiosInstance) => {
  // const authStore = useAuthStore();

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // errorNotificationHandler(error);

      if (error.response && error.response.status !== 401) {
        return Promise.reject(error);
      }

      try {
        // await authStore.validate();

        const config = error.config;
        // config.headers.Authorization = `Bearer ${authStore.token}`;

        return new Promise((resolve, reject) => {
          axios
            .request(config)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
      } catch (err) {
        return Promise.reject(error);
      }
    },
  );

  // Add a request interceptor
  axiosInstance.interceptors.request.use((config) => {
    // config.headers.Authorization = `Bearer ${authStore.token}`;
    return config;
  });

  return axiosInstance;
};
