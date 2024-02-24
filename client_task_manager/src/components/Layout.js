// components/Layout.js
import React from 'react';
import Navbar from "@~components/common/Navbar";
import useAuth from "@~hooks/useAuth";
import useCsrfToken from "@~hooks/useCsrfToken";

export default function Layout({ children }) {
    useAuth()
    useCsrfToken()

    return (
        <>
            <Navbar />
            <main className="container mx-auto mt-10">
                {children}
            </main>
        </>
    );
}
