// utils/withAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import API from "@~utils/axios";
import {useDispatch} from "react-redux";
import {setUser} from "@~modules/auth/actions";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const dispatch = useDispatch();


        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const response = await API.get('user', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    if (response.data) {
                        dispatch(setUser(response.data));
                    } else {
                        router.push('/auth/login');
                    }
                } catch (error) {
                    router.push('/auth/login');
                }
            };

            fetchUser();
        }, [router]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
