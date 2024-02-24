// components/Layout.js
import React from 'react';
import Navbar from "@~components/common/Navbar";
import useAuth from "@~hooks/useAuth";

export default function Layout({ children }) {
    useAuth()
    return (
        <>
            <Navbar />
            <main className="container mx-auto mt-10">
                {children}
            </main>
        </>
    );
}
