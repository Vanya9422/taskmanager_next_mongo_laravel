import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {fetchCsrfToken} from "@~modules/auth/actions";

const useCsrfToken = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCsrfToken());
    }, [dispatch]);
};

export default useCsrfToken;
