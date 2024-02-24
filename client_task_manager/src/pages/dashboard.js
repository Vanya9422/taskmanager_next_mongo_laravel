// pages/dashboard.js
import React from 'react';
import {useSelector} from "react-redux";
import {selectUser} from "@~modules/auth/selectors";

export default function Dashboard() {
    const authUser = useSelector(selectUser)

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
            <div className="container mx-auto">
                <div className="p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
                    <h1 className="text-3xl font-semibold text-center mb-6">Dashboard</h1>
                    <p className="text-lg text-gray-700 text-center">
                        Добро пожаловать, <span className="font-semibold">{authUser?.name}!</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
