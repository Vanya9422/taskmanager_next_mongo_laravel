// components/Layout.js
import React from 'react';
import Navbar from "@~components/common/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="container mx-auto mt-10">
                {children}
            </main>
        </>
    );
}
