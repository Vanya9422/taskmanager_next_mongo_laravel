import withAuth from "@~hooks/withAuth";
import React from "react";

const Dashboard = () => {
    return (
        <>
            <h1 className="text-2xl font-bold">Страница информационной панели</h1>
        </>
    );
};

export default withAuth(Dashboard);
