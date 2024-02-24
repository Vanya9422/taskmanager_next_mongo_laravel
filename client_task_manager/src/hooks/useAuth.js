// hooks/useAuth.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Импортируйте ваши действия
import Cookies from 'js-cookie';
import {fetchUserData} from "@~modules/auth/actions";

const useAuth = () => {
    const dispatch = useDispatch();
    const token = Cookies.get('token');

    useEffect(() => {
        if (token)  dispatch(fetchUserData(token));
    }, [dispatch, token]);
};

export default useAuth;
