// src/utils/interceptorsSetup.js
import { API, API_ADMIN } from "@~utils/axios";

export const setupInterceptors = (store) => {
    const addCsrfToken = (config) => {
        const csrfToken = store.getState().auth.csrf_token;

        if (csrfToken) {
            config.headers['X-CSRF-TOKEN'] = csrfToken;
        }

        return config;
    };

    API.interceptors.request.use(addCsrfToken);
    API_ADMIN.interceptors.request.use(addCsrfToken);
};
