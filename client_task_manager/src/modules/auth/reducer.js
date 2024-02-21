// src/modules/auth/reducer.js

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SET_USER_DETAILS } from './actions';

const initialState = {
    loading: false,
    isAuthenticated: false,
    error: null,
    user: null,
    token: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
                isAuthenticated: true,
            };
        case SET_USER_DETAILS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
