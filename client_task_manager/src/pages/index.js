// pages/index.js
import React from 'react';
import TaskList from "@~components/tasks/TaskList";

export default function HomePage() {
    return (
       <>
           <h1 className="text-2xl font-bold">Список задач</h1>
           <TaskList />
       </>
    );
}
