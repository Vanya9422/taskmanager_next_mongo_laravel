// app/tasks/create.js
import React from 'react';
import CreateTaskForm from "@~components/tasks/CreateTaskForm";

export default function CreateTaskPage() {
    return (
        <>
            <h1 className="text-2xl font-bold">Создать задачу</h1>
            <CreateTaskForm />
        </>
    );
}
